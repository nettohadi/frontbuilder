import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const ResizeHandler = styled.div`
  position: absolute;
  border: ${COLORS.SELECTED} solid 1.5px;
  background-color: white;
  z-index: 10;
  border-radius: 5px;

  :hover {
    background-color: ${COLORS.SELECTED};
  }
`;

export const WidthResizer = styled(ResizeHandler)`
  width: 6px;
  height: 15px;
`;

export const HeightResizer = styled(ResizeHandler)`
  width: 15px;
  height: 6px;
`;
