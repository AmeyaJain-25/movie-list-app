import { cloneDeep, isEqual } from 'lodash';
import { useImmer } from 'use-immer';

/**
 * Generic Form Implementation
 *
 * Usage Example:
 *
 * const form = useForm({
 *  initialValues: {
 *    website: ''
 *    rememberMe: false,
 *    tags: []
 *  },
 *  onChangeFormatters: {
 *    website: (value = '') => value.trim()
 *  },
 *  onBlurFormatters: {
 *    website: (value = '') => value.startsWith('http') ? value : 'https:'+value
 *  },
 *  validationRules: {
 *    firstName: value => !value ? 'First name is required' : '',
 *    website: (value, allValues) => allValues.firstName && !value ? 'Website is required when first name is present' : ''
 *  }
 * })
 *
 * const handleOnSave = async () => {
 *  const payload = form.values;
 *  const action = await api.postCall(payload)
 *  if(action.error) {
 *    const { fieldErrors, errorMessage } = extractResponseError(action.error);
 *    form.setFieldErrors(fieldErrors); // Field errors are binded with Input fields
 *    form.setError(errorMessage); // Any generic error message that you want to display at form level
 *  }
 * }
 *
 * render() {
 *    return <Box>
 *      <TextInputWithError {...form.getInputProps('website')} />
 *      <CheckboxWithLabel label={'Remember me'} {...form.getInputProps('isCurrentlyWorking', { isCheckbox: true })} />
 *      <MultiSelect data={[...]} onChange={(opts) => {
 *        const values = opts.map(opt => opt.value);
 *        form.setFieldValues('tags', values);
 *      }}
 *
 *      {form.error ? <ErrorText>{form.error}</ErrorText> : null}
 *
 *      <Flex>
 *        <Button disabled={form.isPristine()}>Discard</Button>
 *        <Button disabled={!form.isValid()}>Save</Button>
 *      </Flex>
 *     </Box>
 * }
 */
const useForm = ({
  initialValues = {},
  validationRules = {},
  onChangeFormatters = {},
  onBlurFormatters = {},
} = {}) => {
  const [form, setForm] = useImmer(() => {
    return {
      values:
        typeof initialValues === 'function'
          ? initialValues()
          : cloneDeep(initialValues),
      errors: {},
      error: '',
    };
  });

  /**
   * Set general error
   * @param {any} err Error message
   */
  const setError = (err) => {
    setForm((f) => {
      f.error = err;
    });
  };

  /**
   * Set specific field value
   * @param {string} fieldName
   * @param {any} value Field value
   */
  const setFieldValue = (fieldName, value) => {
    setForm((f) => {
      f.values[fieldName] = value;
      f.errors[fieldName] = '';
      f.error = '';
    });
  };

  /**
   * Set field values in bulk
   * @param {Record<string, any>} values Value object with field values
   */
  const setFieldValues = (values = {}) => {
    setForm((f) => {
      for (const fieldName in values) {
        f.values[fieldName] = values[fieldName];
        f.errors[fieldName] = '';
      }
      f.error = '';
    });
  };

  /**
   * Set a specific field error
   * @param {string} fieldName
   * @param {any} err Error for the field
   */
  const setFieldError = (fieldName, err) => {
    setForm((f) => {
      f.errors[fieldName] = err;
    });
  };

  /**
   * Set field errors in bulk
   * @param {Record<string, any>} errs Error object with field errors
   */
  const setFieldErrors = (errs = {}) => {
    setForm((f) => {
      for (const fieldName in errs) {
        f.errors[fieldName] = errs[fieldName];
      }
    });
  };

  const handleInputChange = (fieldName) => (e) => {
    const value = e.target.value;
    const changeFormatter = onChangeFormatters[fieldName];
    const finalValue = changeFormatter ? changeFormatter(value) : value;
    setFieldValue(fieldName, finalValue);
  };

  const handleCheckboxChange = (fieldName) => () => {
    const value = form.values[fieldName];
    setFieldValue(fieldName, !value);
  };

  /**
   *
   * @param {string} fieldName Field name to set attributes
   * @returns {{onChange: (e: Event) => void, onBlur: (e: Event) => void, errorText: string, value?: any, checked?: boolean}}
   */
  const getInputProps = (fieldName, { isCheckbox = false } = {}) => {
    const value = form.values[fieldName];
    const error = form.errors[fieldName];
    const blurFormatter = onBlurFormatters[fieldName];
    const props = {
      errorText: error,
      value: isCheckbox ? undefined : value,
      checked: isCheckbox ? value : undefined,
      onChange: isCheckbox
        ? handleCheckboxChange(fieldName)
        : handleInputChange(fieldName),
      onBlur: blurFormatter
        ? () => setFieldValue(fieldName, blurFormatter(value))
        : undefined,
    };
    return props;
  };

  /**
   *
   * @param {string} fieldName
   * @returns {string} Error message
   */
  const validateField = (fieldName) => {
    const value = form.values[fieldName];
    const validateFn = validationRules[fieldName];
    if (validateFn) {
      return validateFn(value, form.values);
    }
    return '';
  };

  /**
   * Validate all fields without setting the error messages
   * @returns {boolean} `true` if valid, else `false`
   */
  const isValid = () => {
    const values = form.values;
    let valid = true;
    for (const fieldName in values) {
      const errorMsg = validateField(fieldName);
      if (errorMsg) {
        valid = false;
        break;
      }
    }
    return valid;
  };

  /**
   * Validate all fields and set respective error messages.
   * It causes a re-render
   * @returns {boolean} `true` if valid, else `false`
   */
  const validateAndSetErrors = () => {
    const values = form.values;
    const errors = {};
    let valid = true;
    for (const fieldName in values) {
      const errorMsg = validateField(fieldName);
      if (errorMsg) {
        errors[fieldName] = errorMsg;
        valid = false;
      }
    }
    setForm((f) => {
      f.errors = errors;
    });
    return valid;
  };

  /**
   * Check is the form values are changed
   */
  const isPristine = () => {
    let pristine = true;
    const currentValues = form.values;
    for (const fieldName in currentValues) {
      if (!isEqual(currentValues[fieldName], initialValues[fieldName])) {
        pristine = false;
        break;
      }
    }
    return pristine;
  };

  return {
    values: form.values,
    errors: form.errors,
    error: form.error,
    getInputProps,
    setError,
    setFieldValue,
    setFieldValues,
    setFieldError,
    setFieldErrors,
    validateField,
    validateAndSetErrors,
    isValid,
    isPristine,
  };
};

export default useForm;
