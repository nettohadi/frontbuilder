import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { CustomScrollbar } from '@src/styles';

export const NavigatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TreeContainer = styled(CustomScrollbar)`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  border-top: 1px solid ${() => COLORS.INPUT_BORDER()};
  padding: 6px;
  color: ${COLORS.WHITE_TEXT};
  font-size: 12px;
  cursor: pointer;
`;

export const Tree = styled.div<{
  padding: number;
  isClosed: boolean;
}>`
  display: ${({ isClosed }) => (isClosed ? 'none' : 'flex')};
  flex-direction: row;
  width: 100%;
  height: 20px;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  margin-bottom: 5px;
  padding: 2px;
  padding-left: ${({ padding }) => padding}px;
  cursor: pointer;
`;
