import styled from 'styled-components';

export const ColorInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: start;
`;

export const ButtonColor = styled.button<{ color?: string }>`
  position: relative;
  width: 20px;
  background-color: ${({ color }) => color || 'white'};
  cursor: pointer;
  border: none;
`;

export const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: -45px;
  z-index: 5;
  height: 100vh;
`;
