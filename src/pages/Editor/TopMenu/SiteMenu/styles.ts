import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

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
  justify-content: space-between;
  flex-grow: 1;
  cursor: pointer;
  padding: 5px 7px;
  border-radius: 3px;
  background-color: rgba(148, 147, 147, 0.16);
  border: 1px solid rgba(0, 0, 0, 0.49);
  width: 140px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
  }

  > div > div {
    width: 105px;
    max-width: 105px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    //background-color: #646363;
    border-color: #646363;
  }
`;

export const MenuWrapper = styled.div`
  width: 230px;
  min-height: 60px;

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

  &:hover {
    color: black;
    background-color: ${COLORS.PRIMARY};
  }
`;
