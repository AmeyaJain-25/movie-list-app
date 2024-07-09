import styled from 'styled-components';

import { Box } from '~/components/atoms';
import { mediaQueryMobileOrTablet } from '~/styles/mixins';

export const Root = styled(Box)`
  overflow: hidden;
  border-radius: 6px;
`;

export const HoverShow = styled(Box)`
  display: none;
`;

export const MovieImg = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: fit-content;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
`;

export const MovieDetailsContainer = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: fit-content;
  z-index: 1;
  padding: 8px;
  transition: all 350ms ease-in-out;
`;

export const MovieImgWrapper = styled(Box)`
  position: relative;
  overflow: hidden;

  &:hover {
    ${MovieImg} {
      filter: brightness(55%);
      transform: scale(1.2);
    }

    ${HoverShow} {
      display: block;
    }
    ${MovieDetailsContainer} {
      height: 100%;
    }
  }

  ${mediaQueryMobileOrTablet} {
    &:hover {
      ${MovieImg} {
        filter: unset;
        transform: none;
      }
    }
  }
`;
