import styled from 'styled-components';

import { mediaQueryMobileOnly } from '~/styles/mixins';
import SectionContainer from '~/components/layout/SectionContainer';

const PageContainer = styled(SectionContainer).attrs({ as: 'main' })`
  width: 100%;
  min-height: calc(100vh - 84px); // full screen minus header

  ${mediaQueryMobileOnly} {
    min-height: calc(100vh - 56px); // full screen minus header
  }
`;

export const PageContainerFlex = styled(PageContainer)`
  display: flex;
`;

PageContainerFlex.defaultProps = {
  flexDirection: 'column',
};

export default PageContainer;
