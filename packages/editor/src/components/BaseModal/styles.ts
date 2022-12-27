import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const MainContainer = styled.div`
  background-color: rgba(21, 21, 21, 0.49);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 12;
  backdrop-filter: blur(3px);
`;

export const Content = styled.div`
  width: auto;
  height: auto;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  background-color: ${COLORS.CONTROL_BACKGROUND};
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.33);
`;

export const Title = styled.div`
  padding: 10px;
  width: 100%;
  height: 40px;
  background-color: ${COLORS.CONTROL_SECONDARY_BACKGROUND};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: rgba(200, 200, 204, 0.7);
`;

const getAlignment = (align?: 'left' | 'center' | 'right') => {
  switch (align) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    default:
      return 'center';
  }
};
export const Footer = styled.div<{ alignment?: 'left' | 'center' | 'right' }>`
  padding: 10px;
  width: 100%;

  background-color: ${COLORS.CONTROL_SECONDARY_BACKGROUND};
  display: flex;
  flex-direction: row;
  justify-content: ${({ alignment }) => getAlignment(alignment)};
  gap: 5px;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  height: 22px;

  &:hover {
    background-color: rgb(58, 57, 57);
  }
`;
