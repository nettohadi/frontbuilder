import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { CustomScrollbar } from '@src/styles';

export const Wrapper = styled.div<{ width: string }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  //flex-grow: 1;
  cursor: pointer;
  padding: 3px 5px;
  background-color: ${COLORS.INPUT_BACKGROUND};
  border: 1px solid rgba(0, 0, 0, 0.49);
  width: ${({ width }) => width};
  height: auto;
  gap: 2px;
  font-size: 13px;

  > label {
    font-size: 13px;
    color: darkgray;
    width: auto;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    flex-grow: 1;
  }

  > div > div {
    width: 110px;
    max-width: 110px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  > svg {
    width: 20px;
  }

  &:hover {
    //background-color: #646363;
    border-color: #646363;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #e0dddd;
  font-size: 13px;
  font-weight: normal;
  gap: 5px;
  padding: 4px 8px;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  &:hover {
    background-color: ${COLORS.MENU_HOVER};
  }
`;

export const ListWrapper = styled(CustomScrollbar)<{ width: string }>`
  width: ${({ width }) => width};
  max-height: 250px;
  overflow-y: auto;
`;
