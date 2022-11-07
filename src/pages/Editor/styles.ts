import styled from 'styled-components';
import { MEASUREMENT } from '@src/global/StyleVariables';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  height: calc(100vh - 40px);
  background-color: #202124;
`;

export const Canvas = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  overflow: auto;
`;

export const LeftPanel = styled.div<{ $data: any }>`
  width: ${MEASUREMENT.LEFT_PANEL_WIDTH};
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #404040;
  ${(props) => props.$data}
  .LG & {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const RightPanel = styled.div`
  width: ${MEASUREMENT.RIGHT_PANEL_WIDTH};
  height: 100%;
  overflow: hidden;
`;
