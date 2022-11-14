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
  background-color: ${COLORS.INPUT_BACKGROUND};
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
`;
