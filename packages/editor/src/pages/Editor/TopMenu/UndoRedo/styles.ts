import styled from 'styled-components';

export const UndoRedo = styled.button<{ off: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 4px 7px;
  color: ${(props) => (props.off ? 'grey' : '#dad9d9')};
  cursor: ${(props) => (props.off ? 'not-allowed' : 'pointer')};

  &:hover {
    color: ${(props) => (props.off ? 'grey' : 'white')};
  }
`;
