import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const MainContainer = styled.div`
  width: 100vw;
  max-width: 700px;
  max-height: 600px;
  height: 80vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: ${COLORS.WHITE_TEXT};
`;
