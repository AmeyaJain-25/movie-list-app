import styled from 'styled-components';

import { ParaXSmall } from '~/components/typography';

import Flex from '../Flex';

import ErrorCircleFilledIconComponent from '~public/assets/icons/error-circle-filled.svg';

const ErrorCircleFilledIcon = styled(ErrorCircleFilledIconComponent)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.ICON_NEGATIVE_NORMAL};
`;

const ErrorText = styled(ParaXSmall)`
  color: ${({ theme }) => theme.colors.TEXT_NEGATIVE_NORMAL};
`;

const ErrorMessage = ({ hideIcon, errorText = '', ...rest }) => {
  return (
    <Flex alignItems="center" {...rest}>
      {!hideIcon ? <ErrorCircleFilledIcon /> : null}
      <ErrorText>{errorText}</ErrorText>
    </Flex>
  );
};

export default ErrorMessage;
