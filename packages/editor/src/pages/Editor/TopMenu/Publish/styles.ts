import styled from 'styled-components';

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
  height: 26px;

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
  height: 26px;

  &:hover {
    background-color: white;
  }
`;

export const MenuContainer = styled.div`
  padding: 5px;
`;

export const SubdomainInfo = styled.div`
  padding: 6px;
`;

export const Subdomain = styled.div`
  font-size: 14px;
`;

export const SubLabel = styled.div`
  font-size: 11px;
  color: darkgray;
`;
