import styled from 'styled-components';

import { Box } from '~/components/atoms';
import {
  mediaQueryMobileOnly,
  mediaQueryMobileOrTablet,
} from '~/styles/mixins';

const SectionContainer = styled(Box)`
  max-width: 1272px; /* 1272 = 1224 content + 24 padding on left and right */

  padding-left: 24px;
  padding-right: 24px;

  ${mediaQueryMobileOrTablet} {
    padding-left: 36px;
    padding-right: 36px;
  }

  ${mediaQueryMobileOnly} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

SectionContainer.defaultProps = {
  ml: 'auto',
  mr: 'auto',
};

export default SectionContainer;
