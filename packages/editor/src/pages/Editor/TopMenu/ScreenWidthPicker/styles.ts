import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const DeviceScreens = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) =>
    selected ? COLORS.INPUT_BACKGROUND : 'inherit'};
  padding: 0px;
  height: 100%;
  width: 40px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border-right: 1px solid ${COLORS.INPUT_BACKGROUND};
  opacity: ${({ selected }) => (selected ? 1 : 0.7)};
  transition: opacity 0.1s ease-in;

  &:hover {
    opacity: 1;
  }
`;

export const ScreenSize = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 10px;
  font-size: 13px;
  color: white;
  height: 100%;
  width: 110px;
  border-right: 1px solid rgba(0, 0, 0, 0.76);
`;
