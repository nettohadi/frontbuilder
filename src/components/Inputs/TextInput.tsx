import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

const TextInput = ({ label, value, onChange, ...props }: any) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} {...props} />
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
