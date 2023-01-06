import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  width: 230px;
  gap: 10px 3px;
  color: whitesmoke;
`;

export const MenuItem = styled.div`
  color: #d0cccc;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 13px;
  padding: 6px 7px;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;

  &:hover {
    background-color: ${COLORS.MENU_HOVER};
  }
`;

export const Label = styled.div`
  font-size: 16px;
`;

export const SubLabel = styled.div`
  font-size: 11px;
  color: #d0cccc;
`;

export const AvatarImage = styled.div<{ url: string; size?: number }>`
  background-image: url('${(props) => props.url || ''}');
  background-size: cover;
  width: ${(props) => props.size || 23}px;
  height: ${(props) => props.size || 23}px;
  border-radius: 50%;
  background-color: ${COLORS.PRIMARY};
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.size ? props.size / 2 : 11)}px;
`;
