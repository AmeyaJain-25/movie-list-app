import { getCopyrightYear } from '~/utils';
import { LabelSmall, TitleSmall } from '~/components/typography';

import SectionContainer from '../SectionContainer';

import * as Styles from './index.styled';

const Footer = ({ ...rest }) => {
  const copyrightYear = getCopyrightYear();

  return (
    <Styles.Root as="footer" {...rest}>
      <SectionContainer>
        <Styles.ContentWrapper>
          <Styles.LogoContainer href="/" title="Movie DB">
            <TitleSmall>Movie DB</TitleSmall>
          </Styles.LogoContainer>
          <Styles.CopyrightContainer>
            <LabelSmall style={{ pointerEvents: 'none' }} as="p">
              © {copyrightYear} Movie DB
            </LabelSmall>
          </Styles.CopyrightContainer>
        </Styles.ContentWrapper>
      </SectionContainer>
    </Styles.Root>
  );
};

export default Footer;
