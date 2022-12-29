import Modal from '@components/BaseModal';
import Button from '@components/Buttons';
import React, { useState } from 'react';
import * as S from './styles';
import TextInput from '@components/Inputs/TextInput';

const SetUrlModal = ({ isOpen, onClose, onSetUrl, url }: any) => {
  const [imageUrl, setImageUrl] = useState(url);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set image url">
      <S.SetUrlContainer>
        <TextInput
          label="Image Url"
          placeholder="Type image url"
          value={url}
          error={''}
          onChange={(e) => setImageUrl(e.target.value)}
          focus={true}
        />
        <S.ButtonsContainer>
          <Button label="Cancel" variant="secondary" onClick={onClose} />
          <Button
            label="Set"
            variant="primary"
            onClick={() => {
              onSetUrl(imageUrl);
              onClose();
            }}
          />
        </S.ButtonsContainer>
      </S.SetUrlContainer>
    </Modal>
  );
};

export default SetUrlModal;
