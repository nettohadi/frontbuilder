import styled from 'styled-components';
import {COLORS} from "@src/global/variables";

export const PageItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: normal;
  gap: 5px;
  width: 100%;
  padding: 10px 8px;
  cursor: pointer;

  .page-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
    flex-grow: 1;
  }

  .home-icon {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background-color: #504f4f;
  }
`;

export const PagesContainer = styled.div`
  color: #e0dddd;
  padding: 0 6px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //padding: 10px 15px;
  width: 130px;
  color: whitesmoke;
`;

export const MenuItem = styled.div`
  color: #d0cccc;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 13px;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: ${COLORS.MENU_HOVER};
  }
`;
