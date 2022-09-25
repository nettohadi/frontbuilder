import styled from 'styled-components';
import { getColor } from '@src/theme';

export const Input = styled.input<any>`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: 1px solid black;
  padding: 3px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 8px;
  font-size: 14px;

  input {
    max-width: 70px;
  }

  label {
    width: 55px;
  }
`;
