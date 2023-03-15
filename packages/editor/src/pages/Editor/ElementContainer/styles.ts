import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

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
  gap: 5px;
  padding: 5px;
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
  font-size: 12px;
  color: ${COLORS.INACTIVE_ICON};

  &:hover {
    color: ${COLORS.ACTIVE_ICON};
  }
`;

export const ElementIconWrapper = styled.div<{ customSize?: number }>`
  transition: all 0.1s ease-in-out;
  padding: 5px;
  font-size: ${(props) => props.customSize || 20}px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid rgba(255, 255, 255, 0.14);
  border-radius: 3px;
`;

export const ElementBlockWrapper = styled.div`
  padding: 10px; ;
`;
