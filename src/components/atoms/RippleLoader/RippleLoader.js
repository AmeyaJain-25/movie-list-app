import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Box from '~/components/atoms/Box';

const animationKeyframes = keyframes`
  0% {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

const Root = styled(Box)`
  display: inline-block;
  position: relative;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  > div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    border-color: ${({ theme }) => theme.colors.BORDER_BRAND_NORMAL};
    border-width: ${(props) => props.size * 0.05};
    animation: ${animationKeyframes} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;

const RippleLoader = ({ size, ...otherProps }) => {
  return (
    <Root size={size} {...otherProps}>
      <div />
      <div />
    </Root>
  );
};

RippleLoader.propTypes = {
  size: PropTypes.number,
};

RippleLoader.defaultProps = {
  size: 80,
};

export default RippleLoader;
