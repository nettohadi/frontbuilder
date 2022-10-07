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
  justify-content: flex-start;
  gap: 8px;
  font-size: 14px;

  input {
    max-width: 60px;
  }

  label {
    font-size: 12px;
    width: 60px;
  }
`;

export const SizeInputContainer = styled.div`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: 1px solid black;
  padding: 3px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 4px;
`;

export const SizeInput = styled.input<{ width?: string }>`
  color: white;
  background-color: ${() => getColor('inputBackground')};
  border: none;
  width: ${(props) => props.width || '60px'};
  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const SpacingContainer = styled.div`
  background-color: #404040;
  color: white;

  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

export const SpacingInput = styled.input<{
  width?: string;
  borderPosition?: string;
}>`
  color: white;
  border: 1px solid black;
  border-${(props) => props.borderPosition || 'left'}: 2px solid grey;
  background-color: ${() => getColor('inputBackground')};
  width: ${(props) => props.width || '60px'};
  font-size: 12px;
  height: 20px;
  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1px;
`;

export const Option = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected ? getColor('inputBackground') : 'rgb(94 94 94)'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border: 1px solid transparent;
  padding: 5px;
  cursor: pointer;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }
`;
