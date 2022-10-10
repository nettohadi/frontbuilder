import styled from 'styled-components';
import { COLORS } from '@src/global/StyleVariables';

export const ElementsWrapper = styled.div`
  background-color: #404040;
  color: whitesmoke;
  width: 100%;
  height: 100%;
`;

export const ElementsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
  font-size: 14px;
`;

export const ElementBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
  min-height: 50px;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  border: 1px solid rgb(43 43 43);
  border-left: 0;
  border-top: 0;
  padding: 10px;
  font-size: 12px;
  color: ${COLORS.INACTIVE_ICON};

  &:hover {
    color: ${COLORS.ACTIVE_ICON};
  }
`;

export const ElementIconWrapper = styled.div<{ customSize?: number }>`
  transition: all 0.1s ease-in-out;
  border-radius: 3px;
  font-size: ${(props) => props.customSize || 20}px;
  width: auto;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
