import styled from 'styled-components';

export const StylesGroup = styled.div`
  display: flex;
  background-color: rgb(43 43 43);
  color: white;
  padding: 8px 6px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 600;
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7px;
`;

export const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2px 10px;
`;

export const PropTabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: rgb(33 33 33);
`;

export const PropTab = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 50px;
  height: 100%;
  font-size: 20px;
  padding: 7px 7px;
  cursor: pointer;
  color: ${(props) => (props.selected ? 'white' : '#b6b6b6')};
  border-right: 1px solid #404040;
  background-color: ${({ selected }) =>
    selected ? '#404040' : 'rgb(33 33 33)'};

  &:hover {
    color: white;
  }
`;
