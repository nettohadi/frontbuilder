import styled from 'styled-components';

export const ColorInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: start;

  .sketch-picker {
    box-shadow: none !important;
  }
`;

export const ButtonColor = styled.button<{ color?: string }>`
  position: relative;
  width: 20px;
  background-color: ${({ color }) => color || 'white'};
  cursor: pointer;
  border: none;
`;
