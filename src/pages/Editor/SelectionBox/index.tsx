import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

const SelectionBox = styled.div`
  opacity: 0;
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  border: 2px solid ${COLORS.SELECTED};
`;

export default SelectionBox;
