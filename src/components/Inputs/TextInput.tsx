import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { useEffect, useRef } from 'react';

type TextInputProps = {
  label: string;
  value: string;
  focus?: boolean;
  onChange: (e: any) => void;
  error?: string;
  [key: string]: any;
};

const TextInput = ({
  label,
  value,
  focus = false,
  onChange,
  error,
  ...props
}: TextInputProps) => {
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      textRef.current?.focus();
    }
  }, [focus]);

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        ref={textRef}
        value={value}
        onChange={onChange}
        {...props}
        error={error}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Wrapper>
  );
};

export default TextInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 7px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: normal;
`;

const ErrorLabel = styled.label`
  font-size: 12px;
  font-weight: normal;
  color: ${COLORS.ERROR};
`;

const Input = styled.input<{ error?: string }>`
  background-color: ${COLORS.INPUT_BACKGROUND};
  color: white;
  border: 1px solid
    ${({ error }) => (error ? COLORS.INPUT_ERROR_BORDER : COLORS.INPUT_BORDER)};
  padding: 3px;
  height: 30px;

  &:focus {
    outline: none;
    border-color: ${({ error }) =>
      error ? COLORS.INPUT_ERROR_BORDER : 'grey'};
  }
`;
