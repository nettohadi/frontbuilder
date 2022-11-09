import styled from 'styled-components';
import { MEASUREMENT } from '@src/global/StyleVariables';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  height: calc(100vh - 40px);
`;

export const Canvas = styled.div`
  padding: 4px;
  width: ${MEASUREMENT.CANVAS_WIDTH};
  overflow: auto;
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
