import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const MainContainer = styled.div`
  width: 400px;
  height: 220px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: ${COLORS.WHITE_TEXT};
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
`;
