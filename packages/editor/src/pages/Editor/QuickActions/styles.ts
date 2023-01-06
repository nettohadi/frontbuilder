import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const MenusContainer = styled.div`
  width: 150px;
  font-size: 13px;
  gap: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3px 0px;
`;

export const MenuContainer = styled.div`
  width: 150px;
  font-size: 13px;
  gap: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 2px 4px;

  &:hover {
    color: black;
    background-color: ${COLORS.PRIMARY};
  }
`;

export const KeyboardShortcutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 3px;
  opacity: 0.7;
`;

export const ElementNameTag = styled.div<{ position: string }>`
  position: absolute;
  top: ${({ position }) => position};
  ${({ position }) => (position !== '' ? `opacity: 1` : 'opacity: 0')};
  left: 0;
  width: auto;
  background-color: ${COLORS.SELECTED};
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 4px;
  padding: 3px 3px;
  color: #efe8ff;
  font-size: 12px;
  line-height: 12px;
  z-index: 11;
`;

export const ElementName = styled.div`
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
