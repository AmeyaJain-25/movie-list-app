import styled, { css } from 'styled-components';

import { Flex } from '~/components/atoms';
import { ParaMediumStrong } from '~/components/typography';
import { mediaQueryMobileOrTablet } from '~/styles/mixins';

export const FiltersWrapper = styled(Flex)`
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 12px;
`;

export const FilterChip = styled(Flex)`
  align-items: center;
  padding: 6px 8px 6px 14px;
  border-radius: 8px;
  cursor: pointer;

  ${({ theme, isSelected }) =>
    isSelected
      ? css`
          background: ${theme.colors.BG_NEGATIVE_NORMAL};
        `
      : css`
          background: ${theme.colors.BG_NEUTRAL_WEAKER};
        `};

  ${mediaQueryMobileOrTablet} {
    padding: 2px 4px 2px 8px;
    border-radius: 4px;
  }
`;

export const FilterText = styled(ParaMediumStrong)`
  white-space: nowrap;

  ${({ theme }) => theme.colors.TEXT_INVERTED};
`;

export const FilterSelectionIcon = styled(Flex)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-left: 4px;

  ${({ theme, isSelected }) =>
    isSelected
      ? css`
          color: ${theme.colors.ICON_ACCENT_NORMAL};
        `
      : css`
          color: ${theme.colors.ICON_NEUTRAL_WEAKER};
        `};

  > svg {
    width: 100%;
    height: 100%;
  }
`;
