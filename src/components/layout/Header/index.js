import { useTheme } from 'styled-components';

import { TitleSmall } from '~/components/typography';

import * as Styles from './index.styled';

const Header = ({ children }) => {
  const theme = useTheme();

  return (
    <Styles.HeaderRoot as="header">
      <Styles.Container>
        <Styles.LogoContainer href="/" title="Movie DB">
          <TitleSmall
            textAlign="center"
            color={theme.colors.TEXT_NEGATIVE_NORMAL}
            style={{ textTransform: 'uppercase' }}
          >
            MovieFix
          </TitleSmall>
        </Styles.LogoContainer>
        {children}
      </Styles.Container>
    </Styles.HeaderRoot>
  );
};

export default Header;
