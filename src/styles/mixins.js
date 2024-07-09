import { css } from 'styled-components';

export const ellipsisCss = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const hideScrollbarCss = css`
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const mediaQueryMobileOnly = () => '@media (max-width: 767px)';
export const mediaQueryTabletOnly = () =>
  '@media (min-width: 768px) and (max-width: 1024px)';
export const mediaQueryDesktopOnly = () => '@media (min-width: 1025px)';
export const mediaQueryMobileOrTablet = () => '@media (max-width: 1024px)';
export const mediaQueryTabletOrDesktop = () => '@media (min-width: 768px)';
