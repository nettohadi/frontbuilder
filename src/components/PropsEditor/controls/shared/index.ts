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
    max-width: 60px;
  }

  label {
    width: 55px;
  }
`;

export const SizeInputContainer = styled.div`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: 1px solid black;
  padding: 3px;
`;

export const SizeInput = styled.input`
  color: white;
  background-color: ${() => getColor('inputBackground')};
  border: none;
  width: 60px;
`;
