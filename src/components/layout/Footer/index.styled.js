import Link from 'next/link';
import styled from 'styled-components';

import { Box, Flex } from '~/components/atoms';

import {
  mediaQueryMobileOnly,
  mediaQueryMobileOrTablet,
} from '~/styles/mixins';

export const Root = styled(Box)`
  background-color: ${({ theme }) => theme.colors.BG_NEUTRAL_STRONG};
`;

export const ContentWrapper = styled(Box)`
  padding: 48px 0;

  ${mediaQueryMobileOrTablet} {
    padding: 40px 0;
  }
  ${mediaQueryMobileOnly} {
    padding: 40px 0 24px 0;
  }
`;

export const LogoContainer = styled(Box).attrs({ as: Link })`
  display: inline-block;
  cursor: pointer;
  margin-right: 40px;
`;

export const CopyrightContainer = styled(Flex)`
  border-top: 1px solid #e9e9e9;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0px 0px;
  margin-top: 80px;
  ${mediaQueryMobileOrTablet} {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 64px;
  }
  ${mediaQueryMobileOnly} {
    margin-top: 24px;
  }
`;
