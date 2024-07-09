import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css, useTheme } from 'styled-components';
import Link from 'next/link';

import Box from '~/components/atoms/Box';

import UnstyledButton from './UnstyledButton';

const STATES = {
  DEFAULT: 'DEFAULT',
  HOVERED: 'HOVERED',
  PRESSED: 'PRESSED',
  LOADING: 'LOADING',
  FOCUSED: 'FOCUSED',
  DISABLED: 'DISABLED',
};

const getWidth = ({ fullWidth }) => {
  return fullWidth ? '100%' : 'auto';
};

const getInlinePadding = ({ iconOnly }) => {
  if (iconOnly) {
    return 4;
  }

  return 10;
};

const getColorStyles = ({ theme }) => {
  return {
    [STATES.DEFAULT]: theme.colors.TEXT_INVERTED,
    [STATES.HOVERED]: theme.colors.TEXT_INVERTED,
    [STATES.PRESSED]: theme.colors.TEXT_INVERTED,
    [STATES.LOADING]: theme.colors.TEXT_INVERTED,
    [STATES.FOCUSED]: theme.colors.TEXT_INVERTED,
    [STATES.DISABLED]: theme.colors.TEXT_NEUTRAL_WEAK,
  };
};

const getBackgroundColorStyles = ({ theme }) => {
  return {
    [STATES.DEFAULT]: theme.colors.BG_NEGATIVE_NORMAL,
    [STATES.HOVERED]: theme.colors.BG_NEGATIVE_WEAK,
    [STATES.PRESSED]: theme.colors.BG_NEGATIVE_STRONG,
    [STATES.LOADING]: theme.colors.BG_NEGATIVE_WEAKER,
    [STATES.FOCUSED]: theme.colors.BG_NEGATIVE_WEAK,
    [STATES.DISABLED]: theme.colors.BG_NEGATIVE_WEAKER,
  };
};

const getBorderRadius = ({ rounded }) => {
  return rounded ? 24 : 8;
};

const getIconSize = ({ iconOnly }) => {
  if (iconOnly) {
    return 28;
  }

  return 24;
};

const getDefaultContentPadding = ({ iconOnly }) => {
  if (iconOnly) {
    return 0;
  }

  return 6;
};

const Root = styled(UnstyledButton)`
  /* layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 32px;
  min-height: 32px;
  width: ${getWidth};

  /* space */
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${getInlinePadding}px;
  padding-right: ${getInlinePadding}px;

  /* color */
  color: ${({ $loading, colorStyles }) =>
    $loading ? colorStyles.LOADING : colorStyles.DEFAULT};
  background-color: ${({ $loading, backgroundColorStyles }) =>
    $loading ? backgroundColorStyles.LOADING : backgroundColorStyles.DEFAULT};

  /* typography */
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeights.semiBold};
  font-family: ${(props) => props.theme.fontFamilies.heading};
  letter-spacing: -0.01em;
  line-height: 20px;
  text-decoration: none;
  pointer-events: ${({ $loading }) => ($loading ? 'none' : 'auto')};

  /* border */
  outline: none;
  border: none;
  border-radius: ${getBorderRadius}px;

  /* actions */
  user-select: none;
  cursor: pointer;

  &:hover {
    color: ${({ colorStyles }) => colorStyles.HOVERED};
    background-color: ${({ backgroundColorStyles }) =>
      backgroundColorStyles.HOVERED};
  }

  &:active {
    color: ${({ colorStyles }) => colorStyles.PRESSED};
    background-color: ${({ backgroundColorStyles }) =>
      backgroundColorStyles.PRESSED};
  }

  /* not using &:disabled because we have scenarios where anchor link can also be disabled  */
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: not-allowed;
          pointer-events: none;
          color: ${({ colorStyles }) => colorStyles.DISABLED};
          background-color: ${({ backgroundColorStyles }) =>
            backgroundColorStyles.DISABLED};
        `
      : null}

  /* adding focus only when anchor is not disabled, this feature is by default for buttons  */
  &:focus-visible {
    ${({ disabled }) =>
      !disabled
        ? css`
            outline: 2px solid
              ${({ theme }) => theme.colors.BORDER_ACCENT_NORMAL};
            outline-offset: 2px;
            color: ${({ $loading, colorStyles }) =>
              $loading ? colorStyles.LOADING : colorStyles.FOCUSED};
            background-color: ${({ $loading, backgroundColorStyles }) =>
              $loading
                ? backgroundColorStyles.LOADING
                : backgroundColorStyles.FOCUSED};
          `
        : null}
  }
`;

const IconWrapper = styled(Box)`
  width: ${getIconSize}px;
  height: ${getIconSize}px;
  flex-shrink: 0;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

/**
 *
 * @component Button
 *
 * @param {Object} props
 * @param {string} [props.variant] 'filled' | 'outlined' | 'transparent'
 * @param {string} [props.color] 'brand' | 'negative' | 'neutral'
 * @param {string} [props.size] 'large' | 'medium' | 'small' | 'x_small'
 * @param {React.ReactElement} [props.icon] use when we have iconOnly button
 * @param {React.ReactElement} [props.iconLeft]
 * @param {React.ReactElement} [props.iconRight]
 * @param {string} [props.text]
 * @param {boolean} [props.rounded]
 * @param {boolean} [loading]
 * @param {string} [props.loadingText]
 * @param {boolean} disabled
 * @param {boolean} fullWidth
 * @param {boolean} uppercase
 * @param {function} [props.onClick]
 * @param {any} iconWrapperCss
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
const Button = forwardRef(({ loading, ...props }, ref) => {
  const {
    variant,
    color,
    size,
    icon,
    iconLeft,
    iconRight,
    rounded,
    text,
    loadingText,
    disabled,
    children,
    iconWrapperCss,
    rootCss,
    as: rootAs,
  } = props;
  const theme = useTheme();
  const backgroundColorStyles = getBackgroundColorStyles({
    variant,
    color,
    theme,
  });

  const colorStyles = getColorStyles({ variant, color, theme });
  const iconOnly = !!icon && !text && !children;
  const hasIconLeft = !!iconLeft;
  const hasIconRight = !!iconRight;
  const iconGap = 6;
  const defaultContentPadding = getDefaultContentPadding({ size, iconOnly });
  const opticalAlignmentPadding = 6;

  let contentNode = null;

  if (iconOnly) {
    contentNode = (
      <IconWrapper
        size={size}
        iconOnly={iconOnly}
        $loading={loading}
        css={iconWrapperCss}
      >
        {icon}
      </IconWrapper>
    );
  } else {
    if (loading && loadingText) {
      contentNode = loadingText;
    } else {
      contentNode = children || text || null;
    }
  }

  let tabIndex;
  if ((rootAs === 'a' || rootAs === Link) && disabled) {
    tabIndex = '-1';
  }

  /* adding padding on both sides for optical alignment, in case any icon is present */
  const contentPaddingLeft = hasIconLeft
    ? iconGap
    : hasIconRight
    ? opticalAlignmentPadding
    : defaultContentPadding;
  const contentPaddingRight = hasIconRight
    ? iconGap
    : hasIconLeft
    ? opticalAlignmentPadding
    : defaultContentPadding;

  return (
    <Root
      ref={ref}
      $loading={loading}
      iconOnly={iconOnly}
      rounded={rounded}
      colorStyles={colorStyles}
      backgroundColorStyles={backgroundColorStyles}
      css={rootCss}
      tabIndex={tabIndex}
      {...props}
    >
      {hasIconLeft && (
        <IconWrapper
          size={size}
          iconOnly={iconOnly}
          $loading={loading}
          css={iconWrapperCss}
        >
          {iconLeft}
        </IconWrapper>
      )}
      <Box pl={`${contentPaddingLeft}px`} pr={`${contentPaddingRight}px`}>
        {contentNode}
      </Box>
      {hasIconRight && (
        <IconWrapper
          size={size}
          iconOnly={iconOnly}
          $loading={loading}
          css={iconWrapperCss}
        >
          {iconRight}
        </IconWrapper>
      )}
    </Root>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  icon: PropTypes.node,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  rounded: PropTypes.bool,
  text: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  uppercase: PropTypes.bool,
  iconWrapperCss: PropTypes.any,
  rootCss: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': function (props) {
    if (props.icon !== undefined) {
      if (props['text'] === undefined && props['aria-label'] === undefined) {
        return new Error('Require aria-label for iconOnly button');
      }
    }
  },
};

export default Button;
