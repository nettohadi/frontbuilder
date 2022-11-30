import styled from 'styled-components';
import { MEASUREMENT } from '@src/global/variables';

export const MenuContainer = styled.div`
  background-color: #404040;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 45px;
  width: 100%;
`;

export const HomeButton = styled.div`
  width: 43px;
  font-family: Frontier, sans-serif;
  font-size: 30px;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  line-height: 40px;
  background-size: 16px 14px;
  background-repeat: no-repeat;
  background-position: 10px center;
  height: 100%;
  cursor: pointer;
  border-right: 1px solid rgba(0, 0, 0, 0.76);

  &:hover {
    color: #24c1c1;
  }
`;

export const PageTitle = styled.div`
  height: 100%;
  color: white;
  text-align: left;
  padding-bottom: 4px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
  font-weight: bold;
  cursor: pointer;

  & > div {
    border: 1px solid transparent;
    padding: 5px 10px;
    border-radius: 3px;
  }

  & > div:hover {
    background-color: black;
  }
`;

export const HomeCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.73);
  width: 431px;
  height: 100%;
  gap: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;

export const DevicesCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;

export const PublishCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  min-width: 431px;
  padding: 8px 5px;
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;

export const PublishButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #dad9d9;
  gap: 5px;
  border-radius: 4px;
  font-size: 13px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

export const PreviewButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: #dad9d9;
  border-radius: 4px;
  font-size: 13px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;
