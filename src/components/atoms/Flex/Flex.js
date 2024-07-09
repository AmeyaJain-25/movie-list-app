import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from '~/components/atoms/Box';

const Flex = styled(Box)``;

Flex.defaultProps = {
  display: 'flex',
  flexDirection: 'row',
};

Flex.propTypes = {
  ...Box.propTypes,
  display: PropTypes.oneOf(['flex', 'inline-flex']),
};

export default Flex;
