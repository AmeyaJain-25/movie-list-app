import styledSystemPropTypes from '@styled-system/prop-types';
import shouldForwardProp from '@styled-system/should-forward-prop';
import styled from 'styled-components';
import {
  compose,
  border,
  flexbox,
  layout,
  space,
  color,
  position,
} from 'styled-system';

// The Unstyled Button behaves similar to the native HTML <button>,
// so it wraps around the text that will be displayed on its surface.
const UnstyledButton = styled.button.withConfig({
  shouldForwardProp,
})`
  ${compose(layout, color, flexbox, space, border, position)};
`;

UnstyledButton.propTypes = {
  ...styledSystemPropTypes.layout,
  ...styledSystemPropTypes.color,
  ...styledSystemPropTypes.flexbox,
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.border,
};

export default UnstyledButton;
