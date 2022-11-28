import * as S from './styles';
import Modal, { ModalFooter } from '@components/BaseModal';
import React, { useEffect } from 'react';
import TextInput from '@components/Inputs/TextInput';
import Button from '@components/Buttons';
import useWebsiteMutation from '@src/hooks/mutations/useWebsiteMutation';
import { current } from '@src/common/current';
import toast from 'react-hot-toast';

const AddEditSiteModal = ({
  isOpen = false,
  onClose = () => {},
  websiteId,
}: {
  isOpen: boolean;
  onClose: () => void;
  websiteId?: number;
}) => {
  const [form, setForm] = React.useState({
    name: { value: '', error: '' },
    slug: { value: '', error: '' },
  });

  const resetForm = () => {
    setForm({
      name: { value: '', error: '' },
      slug: { value: '', error: '' },
    });
  };

  const handleNameChange = (e: any) => {
    const slugValue = String(e.target.value).replaceAll(' ', '-').toLowerCase();
    const newForm = {
      slug: { value: slugValue, error: '' },
      name: { value: e.target.value, error: '' },
    };
    setForm(newForm);
  };

  const handleSlugChange = (e: any) => {
    const value = e.target.value.replaceAll(' ', '-').toLowerCase();
    const newForm = { ...form, slug: { value, error: '' } };
    setForm(newForm);
  };

  const { create, update } = useWebsiteMutation();

  const handleSave = async () => {
    if (!websiteId) {
      await create.mutateAsync({
        name: form.name.value,
        slug: form.slug.value,
        isDefault: false,
        user_id: current.user.id,
      });
    } else {
      await update.mutateAsync({
        id: websiteId,
        name: form.name.value,
        slug: form.slug.value,
        isDefault: false,
        user_id: current.user.id,
      });
    }

    closeModal();
  };

  useEffect(() => {
    if (create.isSuccess) {
      toast.success('Website created successfully');
    }

    if (update.isSuccess) {
      toast.success('Website updated successfully');
    }

    if (create.error) {
      toast.error(String(create?.error) || 'Failed to create website');
    }

    if (update.error) {
      toast.error('Error updating website');
    }
  }, [create.isSuccess, create.error, update.isSuccess, update.error]);

  const buttonIdleLabel = websiteId ? 'Update' : 'Create';
  const buttonLoadingLabel = websiteId ? 'Updating...' : 'Creating...';

  const closeModal = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Create a New Site">
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
            label={
              create.isLoading || update.isLoading
                ? buttonLoadingLabel
                : buttonIdleLabel
            }
            isLoading={create.isLoading || update.isLoading}
            onClick={handleSave}
          />
        </S.ButtonsWrapper>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditSiteModal;
