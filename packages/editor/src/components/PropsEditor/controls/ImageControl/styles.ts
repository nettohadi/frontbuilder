import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

export const LabelCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  width: 50px;
  height: 120px;
`;

export const Img = styled.img<{ src: string }>`
  max-width: 100%;
  max-height: 100%;
  position: relative;
`;

export const ImagePosition = styled.div`
  border-radius: 100%;
  width: 12px;
  height: 12px;
  background-color: #16a8a8;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;

  &:hover {
    background-color: #4bcccc;
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  border: 1px solid ${COLORS.INPUT_BORDER};
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cecdcd;
  color: grey;
  flex-grow: 1;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 0.9px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 60%;
  height: 120px;
  gap: 5px;
`;

export const WhiteButton = styled.button<{ borderRadius?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #dad9d9;
  gap: 5px;
  border-radius: ${(props) => props.borderRadius || '0'};
  font-size: 12px;
  border: none;
  cursor: pointer;
  height: 22px;
  width: 100%;
  flex-grow: 1;
  color: #3f3d3d;

  &:hover {
    background-color: white;
  }
`;

export const SetUrlContainer = styled.div`
  padding: 10px;
  width: 300px;
`;

export const ButtonsContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;
