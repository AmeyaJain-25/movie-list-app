import { useTheme } from 'styled-components';

import { Flex } from '~/components/atoms';
import { TitleSmall } from '~/components/typography';

import * as Styles from './index.styled';

const Header = () => {
  const theme = useTheme();

  return (
    <Styles.Root as="header">
      <Styles.HeaderRoot>
        <Styles.Container>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            height="100%"
          >
            <Styles.LogoContainer href="/" title="Movie DB">
              <TitleSmall
                color={theme.colors.TEXT_NEGATIVE_NORMAL}
                style={{ textTransform: 'uppercase' }}
              >
                MovieFix
              </TitleSmall>
            </Styles.LogoContainer>
          </Flex>
        </Styles.Container>
      </Styles.HeaderRoot>
    </Styles.Root>
  );
};

export default Header;
