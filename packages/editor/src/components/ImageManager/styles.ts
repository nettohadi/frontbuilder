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

export const ImageBox = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover {
    & > .image-overlay {
      display: block;
    }

    & > .action-button {
      display: flex;
    }
  }

  & > .image-overlay {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    z-index: 1;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
  }

  & > .action-button {
    display: none;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #dad9d9;
    gap: 5px;
    border-radius: 3px;
    font-size: 12px;
    border: none;
    cursor: pointer;
    height: 22px;
    width: 60%;
    flex-grow: 1;
    color: #3f3d3d;
    position: absolute;
    z-index: 2;

    &:hover {
      background-color: white;
    }
  }

  & > .action-button.choose {
    margin-bottom: 35px;
  }

  & > .action-button.delete {
    margin-top: 30px;
  }
`;

export const ImageNameLabel = styled.div`
  height: 14px;
  width: 100%;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;
