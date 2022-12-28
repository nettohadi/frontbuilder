import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { CustomScrollbar } from '@src/styles';

export const MainContainer = styled(CustomScrollbar)`
  width: 100vw;
  max-width: 700px;
  max-height: 500px;
  height: 80vh;
  padding: 20px;
  color: ${COLORS.WHITE_TEXT};
  overflow-y: auto;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid ${COLORS.INPUT_BORDER};
  cursor: pointer;
  object-fit: contain;
  background-color: #eaeaea;
  margin-bottom: 10px;

  &:hover {
    border: 1px solid ${COLORS.PRIMARY};
  }
`;

export const UploadImage = styled.div`
  width: 100px;
  height: 100px;
  border: 1.7px dashed ${COLORS.WHITE_TEXT};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.2s ease-in-out;

  label {
    font-size: 12px;
    cursor: pointer;
  }

  &:hover {
    color: ${COLORS.PRIMARY};
    border: 1.7px dashed ${COLORS.PRIMARY};
  }
`;

export const NoImagesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;
