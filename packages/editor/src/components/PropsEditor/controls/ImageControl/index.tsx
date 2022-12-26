import React from 'react';
import * as G from '../shared';
import styled from 'styled-components';
import { BsImageFill } from 'react-icons/bs';
import FileManager from '@components/FileManager';

const ImageControl = ({ setProp, name, value, label }: any) => {
  const [text, setText] = React.useState(value);
  const [fileManagerIsVisible, showFileManager] = React.useState(false);

  React.useEffect(() => {
    setText(value);
  }, [value, setProp]);

  // const handleChange = (e: any) => {
  //     setText(e.target.value);
  //     setProp({ name: e.target.value });
  // };

  const ImagePreviewer = () => {
    const ImageOrPlaceholder = String(value).trim() ? (
      <Image src={value}>
        <ImagePosition />
      </Image>
    ) : (
      <BsImageFill size={40} />
    );
    return (
      <>
        <Wrapper>
          <ImageWrapper>{ImageOrPlaceholder}</ImageWrapper>
          <ChooseButton onClick={() => showFileManager(true)}>
            {String(value).trim() ? 'Replace Image' : 'Choose Image'}
          </ChooseButton>
        </Wrapper>
        <FileManager
          isOpen={fileManagerIsVisible}
          onClose={() => showFileManager(false)}
        />
      </>
    );
  };

  return (
    <G.Container>
      <LabelCol>
        <label>{label}</label>
      </LabelCol>
      <G.InputCol>
        <ImagePreviewer />
      </G.InputCol>
    </G.Container>
  );
};

export default ImageControl;

const LabelCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  width: 50px;
  height: 120px;
`;

const Image = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props: any) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #eaeaea;
  position: relative;
`;

const ImagePosition = styled.div`
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

const ImageWrapper = styled.div`
  border: 1px solid #eaeaea;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #cecdcd;
  border-radius: 3px;
  color: grey;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90px;
  height: 120px;
  gap: 5px;
`;

export const ChooseButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #dad9d9;
  gap: 5px;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px;
  border: none;
  cursor: pointer;
  height: 26px;
  width: 100%;

  &:hover {
    background-color: white;
  }
`;
