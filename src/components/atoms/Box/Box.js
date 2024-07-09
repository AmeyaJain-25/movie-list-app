import styledSystemPropTypes from '@styled-system/prop-types';
import shouldForwardProp from '@styled-system/should-forward-prop';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  background,
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  grid,
} from 'styled-system';

import {
  mediaQueryMobileOnly,
  mediaQueryMobileOrTablet,
} from '~/styles/mixins';

const Box = styled.div.withConfig({
  shouldForwardProp,
})`
  ${layout}
  ${flexbox}
  ${position}
  ${space}
  ${color}
  ${background}
  ${border}
  ${grid}
`;

Box.propTypes = {
  ...styledSystemPropTypes.layout,
  ...styledSystemPropTypes.flexbox,
  ...styledSystemPropTypes.position,
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.color,
  ...styledSystemPropTypes.background,
  ...styledSystemPropTypes.border,
  children: PropTypes.node,
};

export const BoxDesktopAndTablet = styled(Box)`
  display: ${({ display }) => (display ? display : 'block')};

  ${mediaQueryMobileOnly} {
    display: none;
  }
`;

export const BoxDesktopOnly = styled(Box)`
  display: ${({ display }) => (display ? display : 'block')};

  ${mediaQueryMobileOrTablet} {
    display: none;
  }
`;

export const BoxTabletAndMobileOnly = styled(Box)`
  display: none;

  ${mediaQueryMobileOrTablet} {
    display: ${({ display }) => (display ? display : 'block')};
  }
`;

export const BoxMobileOnly = styled(Box)`
  display: none;

  ${mediaQueryMobileOnly} {
    display: ${({ display }) => (display ? display : 'block')};
  }
`;

export default Box;
