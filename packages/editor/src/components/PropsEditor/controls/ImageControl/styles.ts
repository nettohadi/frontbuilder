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

export const Image = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props: any) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #eaeaea;
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

  &:hover {
    background-color: #4bcccc;
    cursor: pointer;
  }
`;

export const ImageWrapper = styled.div`
  border: 1px solid ${COLORS.INPUT_BORDER};
  width: 55%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cecdcd;
  color: grey;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 120px;
  gap: 5px;
`;

export const WhiteButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #dad9d9;
  gap: 5px;
  border-radius: 2px;
  font-size: 12px;
  //padding: 2px;
  border: none;
  cursor: pointer;
  height: 22px;
  width: 100%;

  &:hover {
    background-color: white;
  }
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 20%;
  gap: 2px;
  height: 82px;
`;
