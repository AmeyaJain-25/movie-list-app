import { Flex } from '~/components/atoms';

import * as Styles from './index.styled';

import { TitleSmall } from '~/components/typography';

const Header = () => {
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
              <TitleSmall>Movie DB</TitleSmall>
            </Styles.LogoContainer>
          </Flex>
        </Styles.Container>
      </Styles.HeaderRoot>
    </Styles.Root>
  );
};

export default Header;
