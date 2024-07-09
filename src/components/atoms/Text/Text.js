import styledSystemPropTypes from '@styled-system/prop-types';
import shouldForwardProp from '@styled-system/should-forward-prop';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, compose, position, space, typography } from 'styled-system';

const Text = styled.p.withConfig({
  shouldForwardProp,
})`
  ${compose(position, space, color, typography)}
`;

Text.propTypes = {
  ...styledSystemPropTypes.position,
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.color,
  ...styledSystemPropTypes.typography,
  children: PropTypes.node,
};

export default Text;
