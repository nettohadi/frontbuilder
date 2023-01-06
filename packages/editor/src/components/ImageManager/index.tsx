import { FaCloudUploadAlt, FaBoxOpen } from 'react-icons/fa';
import Modal, { ModalFooter } from '@components/BaseModal';
import * as S from './styles';
import useStorage from '@src/hooks/queries/useStorage';
import { getImageUrl } from '@src/utils/helperFunctions';
import { COLORS } from '@src/global/variables';
import Loading from '@components/Loading';
import Button from '@components/Buttons';
import Image from '@components/Image';

const ImageManager = ({
  onClose,
  inputFileRef,
  setImage,
  deleteImage,
}: {
  onClose: () => void;
  inputFileRef: any;
  setImage: (imageName: string) => void;
  deleteImage: (imageName: string) => void;
}) => {
  const { data, isFetching } = useStorage('images');
  // only take images
  const images = data
    ?.filter((item: any) => item.name !== '.emptyFolderPlaceholder')
    .sort((a: any, b: any) => b.created_at.localeCompare(a.created_at));

  const NoImages = () => {
    return (
      <S.NoImagesContainer>
        <FaBoxOpen size={100} color={'grey'} />
        <div className="text">No images uploaded yet</div>
        <Button
          label="Click here to upload an image"
          variant="primary"
          onClick={() => inputFileRef.current?.click()}
        />
      </S.NoImagesContainer>
    );
  };

  const ImageBox = ({
    onSelect,
    onDelete,
    children,
  }: {
    onSelect: () => void;
    onDelete: () => void;
    children: any;
  }) => {
    return (
      <S.ImageBox>
        <div className="image-overlay"></div>
        <button className="action-button choose" onClick={onSelect}>
          Choose
        </button>
        <button className="action-button delete" onClick={onDelete}>
          Delete
        </button>
        {children}
      </S.ImageBox>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="File Manager">
      <S.MainContainer backgroundColor={COLORS.CONTROL_BACKGROUND}>
        {!images?.length && isFetching && (
          <Loading
            width="100%"
            height="100%"
            text="Fetching images..."
            size={16}
          />
        )}
        {!images?.length && !isFetching && <NoImages />}
        <S.ImageContainer>
          {!!images?.length && (
            <S.UploadImage onClick={() => inputFileRef.current?.click()}>
              <FaCloudUploadAlt size={50} />
              <label>Upload Image</label>
            </S.UploadImage>
          )}
          {images?.map((item: any) => (
            <S.ImageWrapper>
              <ImageBox
                onSelect={() => {
                  setImage(item.name);
                  onClose();
                }}
                onDelete={() => deleteImage(item.name)}
              >
                <Image
                  width="100px"
                  height="100px"
                  src={getImageUrl(item.name)}
                  alt={item.name}
                  key={item.id}
                  onClick={() => {
                    setImage(item.name);
                    onClose();
                  }}
                />
              </ImageBox>
              <S.ImageNameLabel>{item.name}</S.ImageNameLabel>
            </S.ImageWrapper>
          ))}
        </S.ImageContainer>
      </S.MainContainer>
      <ModalFooter alignment={'center'}>
        <div style={{ height: 20 }}></div>
      </ModalFooter>
    </Modal>
  );
};

export default ImageManager;
