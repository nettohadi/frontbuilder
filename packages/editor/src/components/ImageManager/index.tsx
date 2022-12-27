import { FaCloudUploadAlt } from 'react-icons/fa';
import Modal, { ModalFooter } from '@components/BaseModal';
import Button from '../Buttons';
import * as S from './styles';
import useStorage from '@src/hooks/queries/useStorage';
import { current } from '@src/common/current';

const ImageManager = ({
  onClose,
  inputFileRef,
}: {
  onClose: () => void;
  inputFileRef: any;
}) => {
  const { data, error } = useStorage('images');
  console.log(data, error);
  return (
    <Modal isOpen={true} onClose={onClose} title="File Manager">
      <S.MainContainer></S.MainContainer>
      <ModalFooter alignment={'center'}>
        <Button
          variant="primary"
          label="Upload Image"
          icon={<FaCloudUploadAlt size={17} />}
          onClick={() => inputFileRef.current?.click()}
        />
      </ModalFooter>
    </Modal>
  );
};

export default ImageManager;
