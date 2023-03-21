import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { CustomScrollbar } from '@src/styles';

export const SiteMenuWrapper = styled.div`
  height: 100%;
  color: white;
  text-align: left;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: normal;

  & > div {
    border: 1px solid transparent;
    border-radius: 3px;
  }
`;

export const SiteNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  background-color: rgba(148, 147, 147, 0.16);
  border: 1px solid rgba(0, 0, 0, 0.49);
  width: 180px;
  height: 30px;
  gap: 2px;

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

export const MenuWrapper = styled(CustomScrollbar)`
  width: 230px;
  min-height: 60px;
  max-height: 80vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3px;
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
  width: 100%;
  padding: 4px 8px;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  &[aria-disabled='true'] {
    opacity: 0.5;
  }

  &:hover:not([aria-disabled='true']) {
    background-color: ${COLORS.MENU_HOVER};
  }
`;
