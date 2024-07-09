import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from '~/components/atoms/Box';
import { mediaQueryMobileOnly, mediaQueryTabletOnly } from '~/styles/mixins';

/**
 *
 * @param {boolean} showOnDesktop
 * @param {boolean} showOnTablet
 * @param {boolean} showOnMobile
 */
const BoxConditionalDisplay = styled(Box)`
  display: ${({ showOnDesktop, display }) =>
    showOnDesktop ? display : 'none'};

  ${mediaQueryTabletOnly} {
    display: ${({ showOnTablet, display }) =>
      showOnTablet ? display : 'none'};
  }

  ${mediaQueryMobileOnly} {
    display: ${({ showOnMobile, display }) =>
      showOnMobile ? display : 'none'};
  }
`;

BoxConditionalDisplay.defaultProps = {
  display: 'block',
};

BoxConditionalDisplay.propTypes = {
  ...Box.propTypes,
  showOnDesktop: PropTypes.bool,
  showOnTablet: PropTypes.bool,
  showOnMobile: PropTypes.bool,
};

export default BoxConditionalDisplay;
