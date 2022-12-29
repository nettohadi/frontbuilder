import React, { useEffect, useRef } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { ImImages } from 'react-icons/im';
import { CgLink } from 'react-icons/cg';
import toast from 'react-hot-toast';

import * as G from '../shared';
import * as S from './styles';
import { BsImageFill } from 'react-icons/bs';
import ImageManager from '@components/ImageManager';
import Tooltip from '@components/Tooltip';
import useStorage from '@src/hooks/mutations/useStorage';
import { getImageUrl } from '@src/utils/helperFunctions';
import SetUrlModal from '@components/PropsEditor/controls/ImageControl/SetUrlModal';
import Image from '@components/Image';

const ImageControl = ({ setProp, name, value, label }: any) => {
  const [imageSrc, setImageSrc] = React.useState(value);
  const [fileManagerIsVisible, showFileManager] = React.useState(false);
  const [setUrlIsVisible, showSetUrl] = React.useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { upload, remove } = useStorage('images');

  React.useEffect(() => {
    setImageSrc(value);
  }, [value, setProp]);

  const handleChange = async (e: any) => {
    const image = e.target.files[0];
    const imageName = image.name.replace('.', '-');
    await upload.mutateAsync({ imageName, image });
    setImage(imageName);
  };

  const removeImageFromStorage = async (imageName: string) => {
    await remove.mutateAsync({ imageName });
  };

  const setImage = (imageName: string) => {
    setProp({ [name]: getImageUrl(imageName) });
    setImageSrc(getImageUrl(imageName));
  };

  const removeImage = () => {
    setProp({ [name]: '' });
    setImageSrc('');
  };

  useEffect(() => {
    if (upload.isSuccess) {
      toast.dismiss();
      toast.success('Image uploaded successfully');
      upload.reset();
    }

    if (upload.isLoading) {
      toast.loading('Uploading image...');
    }

    if (upload.isError) {
      toast.dismiss();
      toast.error(String(String(upload?.error) || 'Error uploading image'));
      upload.reset();
    }

    if (remove.isSuccess) {
      toast.dismiss();
      toast.success('Image removed successfully');
      remove.reset();
    }

    if (remove.isLoading) {
      toast.loading('Removing image...');
    }

    if (remove.isError) {
      toast.dismiss();
      toast.error(String(String(remove?.error) || 'Error removing image'));
      remove.reset();
    }
  }, [
    upload.isLoading,
    upload.isSuccess,
    upload.isError,
    remove.isError,
    remove.isLoading,
    remove.isSuccess,
    remove,
    upload,
  ]);

  const ImagePreviewer = () => {
    const ImageOrPlaceholder = () =>
      String(imageSrc).trim() ? (
        <Image src={imageSrc}>
          <S.ImagePosition />
        </Image>
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
              <S.WhiteButton
                borderRadius="3px 0 0 3px"
                onClick={() => showFileManager(true)}
              >
                <ImImages size={16} />
              </S.WhiteButton>
            </Tooltip>
            <Tooltip content="Remove Image">
              <S.WhiteButton onClick={removeImage}>
                <FaRegTrashAlt size={16} />
              </S.WhiteButton>
            </Tooltip>
            <Tooltip content="Add Url">
              <S.WhiteButton
                borderRadius="0 3px 3px 0"
                onClick={() => showSetUrl(true)}
              >
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
            deleteImage={removeImageFromStorage}
          />
        )}
        {setUrlIsVisible && (
          <SetUrlModal
            isOpen={setUrlIsVisible}
            onClose={() => showSetUrl(false)}
            onSetUrl={setImage}
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
