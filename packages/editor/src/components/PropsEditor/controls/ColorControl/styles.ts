import styled from 'styled-components';

export const ColorInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  .sketch-picker {
    box-shadow: none !important;
  }

  > div {
    display: flex;
    align-items: center;
  }
`;

export const ButtonColor = styled.button`
  position: relative;
  width: 20px;
  height: 23.5px;
  cursor: pointer;
  border: 1px solid black;
  border-right-width: 0;
`;
