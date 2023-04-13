import styled from 'styled-components';
import { getColor } from '@src/theme';
import { COLORS } from '@src/global/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 5px;

  .input-col {
    max-width: 100%;
  }

  .label-col {
    font-size: 12px;
    width: 50px;
  }

  .spacing-unit {
    font-size: 11px;
  }
`;

export const Input = styled.input<{ width?: string }>`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: 1px solid black;
  padding: 3px;
  width: ${({ width }) => width || '100%'};

  &:focus {
    outline: none;
    border: 1px solid grey;
  }
`;

export const LabelCol = styled.div<{ width?: string }>`
  font-size: 12px;
  width: 90%;
`;

export const InputCol = styled.div`
  height: 100%;
  width: 90%;
`;

export const SizeInputContainer = styled.div`
  background-color: ${() => getColor('inputBackground')};
  color: white;
  border: 1px solid black;
  padding: 3px;
  display: inline-flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 4px;
  width: auto;

  &:focus-within {
    border: 1px solid grey;
  }
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

  &:focus {
    outline: none;
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
  
  &:focus {
    outline: none;
    border: 1px solid grey;
    border-${(props) => props.borderPosition || 'left'}: 3px solid grey;
  }
`;

export const EqualSizeButton = styled.div<{ isActive: boolean }>`
  font-size: 16px;
  color: white;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.HOVER_BACKGROUND_TOGGLE_CONTROL};
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
  height: 26px;

  &:hover {
    opacity: 1;
  }
`;

export const Select = styled.select`
  background-color: ${COLORS.INPUT_BACKGROUND};
  color: white;
  border: 1px solid ${COLORS.INPUT_BORDER};
  padding: 3px;

  &:focus-within {
    outline: 1px solid whitesmoke;
  }
`;
