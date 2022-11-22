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

export const ButtonColor = styled.button`
  position: relative;
  width: 20px;
  height: 100%;
  cursor: pointer;
  border: 1px solid black;
  border-right-width: 0px;
`;
