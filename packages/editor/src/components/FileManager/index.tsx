import { FaCloudUploadAlt } from 'react-icons/fa';
import Modal, { ModalFooter } from '@components/BaseModal';
import Button from '../Buttons';
import * as S from './styles';

const FileManager = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="File Manager">
      <S.MainContainer></S.MainContainer>
      <ModalFooter alignment={'center'}>
        <Button
          variant="primary"
          label="Upload Image"
          icon={<FaCloudUploadAlt size={17} />}
        />
      </ModalFooter>
    </Modal>
  );
};

export default FileManager;
