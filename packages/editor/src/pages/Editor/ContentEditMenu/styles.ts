import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const Placer = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% + 2px);
  height: 100%;
`;

export const MenusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  position: absolute;
  top: -60px;
  left: 0;
  background-color: #333333;
  color: white;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: #504f4f;
  }
`;

export const ColorButton = styled.div<{ color: string }>`
  height: 20px;
  width: 20px;
  border: 2px solid white;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;
