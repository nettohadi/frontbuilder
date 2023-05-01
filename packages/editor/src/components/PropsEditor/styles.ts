import styled from 'styled-components';
import { CustomScrollbar } from '@src/styles';

export const StylesGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(43 43 43);
  color: #e1e1e1;
  padding: 8px 6px;
  padding-left: 10px;
  padding-right: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 0.5px solid rgba(211, 211, 211, 0.18);

  &:hover {
    //background-color: rgb(52, 52, 52);
    color: white;
  }

  > .chevron:hover {
    background-color: rgb(70, 70, 70);
  }
`;

export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 7px;
`;

export const QuickActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
  gap: 10px;
`;

export const PropsContainer = styled(CustomScrollbar)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
`;

export const PropContainer = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: ${(props) => (props.open ? '10px' : '0')};
  height: ${(props) => (props.open ? 'auto' : '0')};
  overflow: hidden;
  background-color: #404040;
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

export const PropEditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2b2b2b;
  color: white;
`;
