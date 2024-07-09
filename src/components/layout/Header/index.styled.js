import styled from 'styled-components';
import Link from 'next/link';

import { Box } from '~/components/atoms';

import {
  mediaQueryMobileOnly,
  mediaQueryMobileOrTablet,
} from '~/styles/mixins';
import SectionContainer from '~/components/layout/SectionContainer';

export const Root = styled(Box)`
  height: 84px;
  ${mediaQueryMobileOrTablet} {
    height: 72px;
  }
  ${mediaQueryMobileOnly} {
    height: 56px;
  }
`;

export const HeaderRoot = styled(Box)`
  height: 84px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.BG_NEUTRAL_STRONG};
  border-bottom: 1px solid ${({ theme }) => theme.colors.BORDER_NEGATIVE_NORMAL};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  z-index: 999;

  ${mediaQueryMobileOrTablet} {
    height: 72px;
  }
  ${mediaQueryMobileOnly} {
    height: 56px;
  }
`;

export const Container = styled(SectionContainer)`
  height: 100%;
`;

export const LogoContainer = styled(Box).attrs({ as: Link })`
  cursor: pointer;
`;
