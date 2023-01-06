import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const ElementWidthLine = styled.div`
  position: absolute;
  z-index: 11;
  top: calc(50% - 2px);
  width: calc(100% - 10px);
  left: 4px;
  height: 2px;
  background-color: ${COLORS.SELECTED};
  color: ${COLORS.SELECTED};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ElementWidthInfo = styled.div`
  width: auto;
  height: auto;
  padding: 5px 7px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${COLORS.SELECTED};
  color: white;
  text-align: center;
`;

export const ElementHeightLine = styled.div`
  position: absolute;
  z-index: 11;
  left: calc(50% + 1px);
  top: 4px;
  height: calc(100% - 10px);
  width: 2px;
  background-color: ${COLORS.SELECTED};
  color: ${COLORS.SELECTED};
  text-align: center;
  line-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

export const ElementHeightInfo = styled.div`
  width: auto;
  height: auto;
  padding: 5px 7px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${COLORS.SELECTED};
  color: white;
  text-align: center;
`;
