import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ImImages } from 'react-icons/im';
import { CgLink } from 'react-icons/cg';

import * as G from '../shared';
import * as S from './styles';
import { BsImageFill } from 'react-icons/bs';
import ImageManager from '@components/ImageManager';
import Tooltip from '@components/Tooltip';
import useStorageUpload from '@src/hooks/mutations/useStorageUpload';
import toast from 'react-hot-toast';
import { current } from '@src/common/current';

const baseUrl =
  'https://vhhpxskjmppjmqcrlarl.supabase.co/storage/v1/object/public/images';
const ImageControl = ({ setProp, name, value, label }: any) => {
  const [imageSrc, setImageSrc] = React.useState(value);
  const [fileManagerIsVisible, showFileManager] = React.useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { upload } = useStorageUpload('images');

  React.useEffect(() => {
    setImageSrc(value);
  }, [value, setProp]);

  const handleChange = async (e: any) => {
    const imageName = uuidv4();
    await upload.mutateAsync({ imageName, image: e.target.files[0] });
    console.log({ name, value, label });
    setImage(imageName);
  };

  const setImage = (imageName: string) => {
    setProp({ [name]: `${baseUrl}/${current.user.id}/${imageName}` });
    setImageSrc(`${baseUrl}/${current.user.id}/${imageName}`);
  };

  useEffect(() => {
    if (upload.isSuccess) {
      toast.dismiss();
      toast.success('Image uploaded successfully');
    }

    if (upload.isLoading) {
      toast.loading('Uploading image...');
    }

    if (upload.isError) {
      toast.dismiss();
      console.log({ error: upload.error });
      toast.error(String(String(upload?.error) || 'Error uploading image'));
    }
  }, [upload.isLoading, upload.isSuccess, upload.isError]);

  const ImagePreviewer = () => {
    const ImageOrPlaceholder = () =>
      String(imageSrc).trim() ? (
        <S.Image src={imageSrc}>
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
        <input
          type="file"
          style={{ display: 'none' }}
          accept={'image/png, image/jpeg, image/jpg, image/gif'}
          ref={inputFileRef}
          onChange={handleChange}
        />
        {fileManagerIsVisible && (
          <ImageManager
            onClose={() => showFileManager(false)}
            inputFileRef={inputFileRef}
            setImage={setImage}
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
