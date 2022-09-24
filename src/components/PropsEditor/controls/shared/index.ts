import styled from 'styled-components';
import { getColor } from '@src/theme';

export const Input = styled.input<any>`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: 1px solid black;
  padding: 3px;
`;

export const ControlContainer = styled.div`
  padding: 10px;
`;
