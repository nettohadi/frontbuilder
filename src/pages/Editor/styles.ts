import styled from 'styled-components';
import { COLORS, MEASUREMENT } from '@src/global/variables';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  height: calc(100vh - 40px);
`;

export const Canvas = styled.div`
  width: ${MEASUREMENT.CANVAS_WIDTH};
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.9);
`;

export const LeftPanel = styled.div`
  width: ${MEASUREMENT.LEFT_PANEL_WIDTH};
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #404040;
`;

export const RightPanel = styled.div`
  width: ${MEASUREMENT.RIGHT_PANEL_WIDTH};
  height: 100%;
  overflow: hidden;
`;

export const Wrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => width};
  overflow-x: hidden;
  transition: width 0.3s ease-in-out;
  border-left: 1px solid rgba(128, 128, 128, 0.46);
  border-right: 1px solid rgba(128, 128, 128, 0.46);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.SCROLLBAR_BACKGROUND};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.SCROLLBAR_THUMB};
    border-radius: 20px;
    border: 3px solid ${COLORS.SCROLLBAR_BACKGROUND};
  }
`;
