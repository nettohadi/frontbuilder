import styled from 'styled-components';

export const MenuContainer = styled.div`
  background-color: #404040;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 45px;
  width: 100%;
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
  padding: 8px 12px 8px 5px;
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.76);
`;
