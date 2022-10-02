import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.76);
  background-color: #2f2e2e;
`;

export const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 23px;
  cursor: pointer;
  color: ${(props) =>
    props.isSelected ? 'white' : 'rgba(255, 255, 255, 0.45)'};
  border-left: 3px solid
    ${(props) => (props.isSelected ? 'white' : 'transparent')};
  transition: all 0.2s ease-in;

  &:hover {
    color: white;
  }
`;
