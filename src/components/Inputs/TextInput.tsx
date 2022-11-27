import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { useEffect, useRef } from 'react';

type TextInputProps = {
  label: string;
  value: string;
  focus?: boolean;
  onChange: (e: any) => void;
  [key: string]: any;
};

const TextInput = ({
  label,
  value,
  focus = false,
  onChange,
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
      <Input ref={textRef} value={value} onChange={onChange} {...props} />
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

const Input = styled.input`
  background-color: ${COLORS.INPUT_BACKGROUND};
  color: white;
  border: 1px solid black;
  padding: 3px;
  height: 30px;

  &:focus {
    outline: none;
    border-color: grey;
  }
`;
