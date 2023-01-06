import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const PublishButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.PRIMARY};
  gap: 5px;
  border-radius: 4px;
  font-size: 13px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;
  height: 26px;

  &:hover {
    background-color: ${COLORS.PRIMARY_HOVER}
`;

export const PreviewButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: ${COLORS.SECONDARY};
  border-radius: 4px;
  font-size: 13px;
  padding: 4px 10px;
  cursor: pointer;
  height: 30px;
  border: 1px solid black;
  color: white;

  &:hover {
    background-color: ${COLORS.SECONDARY_HOVER};
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
