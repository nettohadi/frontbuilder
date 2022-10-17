import styled from 'styled-components';

export const Placer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
`;

export const MenusContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
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
