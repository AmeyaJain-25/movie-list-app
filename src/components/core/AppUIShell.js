import styled from 'styled-components';

import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import { Box } from '../atoms';

const AppUIShell = ({ children, hideFooter = false }) => {
  return (
    <Root>
      <Header />
      {children}
      {!hideFooter ? <Footer /> : null}
    </Root>
  );
};

export default AppUIShell;

const Root = styled(Box)`
  background: ${({ theme }) => theme.colors.BG_INVERTED};
`;
