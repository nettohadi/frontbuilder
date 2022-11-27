import * as S from './styles';
import Modal, { ModalFooter } from '@components/BaseModal';
import React from 'react';
import TextInput from '@components/Inputs/TextInput';
import Button from '@components/Buttons';

const AddEditSiteModal = ({
  isOpen = false,
  onClose = () => {},
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [form, setForm] = React.useState({
    name: { value: '', error: '' },
    slug: { value: '', error: '' },
  });

  const [isSaving, setIsSaving] = React.useState(false);

  const handleNameChange = (e: any) => {
    const slugValue = String(e.target.value).replaceAll(' ', '-').toLowerCase();
    const newForm = {
      slug: { value: slugValue, error: '' },
      name: { value: e.target.value, error: '' },
    };
    setForm(newForm);
  };

  const handleSlugChange = (e: any) => {
    const newForm = { ...form, slug: { value: e.target.value, error: '' } };
    setForm(newForm);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a New Site">
      <S.MainContainer>
        <S.InputsWrapper>
          <TextInput
            label="Name"
            placeholder="Good name for your site"
            value={form.name.value}
            onChange={handleNameChange}
            focus={true}
          />
          <TextInput
            label="Slug"
            placeholder="This will be used as your site path"
            value={form.slug.value}
            onChange={handleSlugChange}
          />
        </S.InputsWrapper>
      </S.MainContainer>
      <ModalFooter>
        <S.ButtonsWrapper>
          <Button variant="secondary" label="Cancel" />
          <Button
            variant="primary"
            label={isSaving ? 'Creating' : 'Create'}
            isLoading={isSaving}
            onClick={() => setIsSaving((s) => !s)}
          />
        </S.ButtonsWrapper>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditSiteModal;
