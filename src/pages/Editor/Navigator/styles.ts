import styled from 'styled-components';
import { COLORS } from '@src/global/StyleVariables';

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${() => COLORS.INPUT_BORDER()};
  padding: 6px;
  color: ${COLORS.WHITE_TEXT};
  font-size: 12px;
`;

export const Tree = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
  padding: 1px;
  background-color: ${({ isSelected }) =>
    isSelected ? COLORS.SELECTED : 'transparent'};
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? COLORS.SELECTED : 'rgba(255, 255, 255, 0.12)'};
  }
`;

export const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`;

export const TreeChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5px;
  padding-left: 4px;
  border-left: 0.5px solid ${() => COLORS.WHITE_TEXT};
  //background-color: #0074d9;
  margin-top: 0px;
  transform: translateX(3.5px);
`;
