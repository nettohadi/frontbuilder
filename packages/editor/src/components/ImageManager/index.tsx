import { FaCloudUploadAlt, FaBoxOpen } from 'react-icons/fa';
import Modal, { ModalFooter } from '@components/BaseModal';
import * as S from './styles';
import useStorage from '@src/hooks/queries/useStorage';
import { getImageUrl } from '@src/utils/helperFunctions';
import { COLORS } from '@src/global/variables';
import Loading from '@components/Loading';
import Button from '@components/Buttons';

const ImageManager = ({
  onClose,
  inputFileRef,
  setImage,
}: {
  onClose: () => void;
  inputFileRef: any;
  setImage: (imageName: string) => void;
}) => {
  const { data, isFetching } = useStorage('images');

  const NoImages = () => {
    return (
      <S.NoImagesContainer>
        <FaBoxOpen size={100} color={'grey'} />
        <div className="text">No images uploaded yet</div>
        <Button
          label="Click here to upload an image"
          variant="secondary"
          onClick={() => inputFileRef.current?.click()}
        />
      </S.NoImagesContainer>
    );
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="File Manager">
      <S.MainContainer backgroundColor={COLORS.CONTROL_BACKGROUND}>
        {!data?.length && isFetching && (
          <Loading
            width="100%"
            height="100%"
            text="Fetching images..."
            size={16}
          />
        )}
        {!data?.length && !isFetching && <NoImages />}
        <S.ImageContainer>
          {!!data?.length && (
            <S.UploadImage onClick={() => inputFileRef.current?.click()}>
              <FaCloudUploadAlt size={50} />
              <label>Upload Image</label>
            </S.UploadImage>
          )}
          {data
            ?.filter((item: any) => item.name !== '.emptyFolderPlaceholder')
            .sort((a: any, b: any) => b.created_at.localeCompare(a.created_at))
            .map((item: any) => (
              <S.Image
                id={item.name}
                src={getImageUrl(item.name)}
                alt={item.name}
                key={item.id}
                onClick={() => {
                  setImage(item.name);
                  onClose();
                }}
              />
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
