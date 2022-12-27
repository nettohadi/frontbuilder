import React, { useRef } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ImImages } from 'react-icons/im';
import { CgLink } from 'react-icons/cg';

import * as G from '../shared';
import * as S from './styles';
import { BsImageFill } from 'react-icons/bs';
import ImageManager from '@components/ImageManager';
import Tooltip from '@components/Tooltip';

const ImageControl = ({ setProp, name, value, label }: any) => {
  const [text, setText] = React.useState(value);
  const [fileManagerIsVisible, showFileManager] = React.useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setText(value);
  }, [value, setProp]);

  // const handleChange = (e: any) => {
  //     setText(e.target.value);
  //     setProp({ name: e.target.value });
  // };

  const ImagePreviewer = () => {
    const ImageOrPlaceholder = () =>
      String(value).trim() ? (
        <S.Image src={value}>
          <S.ImagePosition />
        </S.Image>
      ) : (
        <BsImageFill size={40} />
      );

    return (
      <>
        <S.Wrapper>
          <S.ImageWrapper>
            <ImageOrPlaceholder />
          </S.ImageWrapper>
          <S.ButtonsWrapper>
            <Tooltip content="Add Image">
              <S.WhiteButton onClick={() => showFileManager(true)}>
                <ImImages size={16} />
              </S.WhiteButton>
            </Tooltip>
            <Tooltip content="Remove Image">
              <S.WhiteButton>
                <FaRegTrashAlt size={16} />
              </S.WhiteButton>
            </Tooltip>
            <Tooltip content="Add Url">
              <S.WhiteButton>
                <CgLink size={16} />
              </S.WhiteButton>
            </Tooltip>
          </S.ButtonsWrapper>
        </S.Wrapper>
        <input type="file" style={{ display: 'none' }} ref={inputFileRef} />
        {fileManagerIsVisible && (
          <ImageManager
            onClose={() => showFileManager(false)}
            inputFileRef={inputFileRef}
          />
        )}
      </>
    );
  };

  return (
    <G.Container>
      <S.LabelCol>
        <label>{label}</label>
      </S.LabelCol>
      <G.InputCol>
        <ImagePreviewer />
      </G.InputCol>
    </G.Container>
  );
};

export default ImageControl;
