import styled from 'styled-components';

const ButtonIcon = () => {
  return <StyledButton>Button</StyledButton>;
};

export default ButtonIcon;

const StyledButton = styled.div`
  height: 20px;
  width: 120%;
  border: 1px solid;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
  text-align: center;
  line-height: 9px;
  background-color: white;
  color: black;
`;
