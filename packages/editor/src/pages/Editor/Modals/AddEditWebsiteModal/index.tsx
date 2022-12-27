import * as S from './styles';
import Modal, { ModalFooter } from '@src/components/BaseModal';
import React, { useEffect } from 'react';
import TextInput from '@src/components/Inputs/TextInput';
import Button from '@src/components/Buttons';
import useWebsiteMutation from '@src/hooks/mutations/useWebsiteMutation';
import { current } from '@src/common/current';
import toast from 'react-hot-toast';
import { sanitizeForUrl } from '@src/utils/helperFunctions';

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

  const validateValue = (value: any) => {
    let error = '';
    if (String(value).trim().length === 0) {
      error = 'This field is required';
    }
    return error;
  };

  const handleNameChange = (e: any) => {
    const newForm = {
      slug: {
        value: sanitizeForUrl(e.target.value.replaceAll(' ', '-')),
        error: validateValue(e.target.value),
      },
      name: { value: e.target.value, error: validateValue(e.target.value) },
    };
    setForm(newForm);
  };

  const handleSlugChange = (e: any) => {
    const newForm = {
      ...form,
      slug: {
        value: sanitizeForUrl(e.target.value),
        error: validateValue(e.target.value),
      },
    };
    setForm(newForm);
  };

  const { create, update } = useWebsiteMutation();

  const canSubmit =
    form.name.error === '' &&
    form.slug.error === '' &&
    form.name.value !== '' &&
    form.slug.value !== '';

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
            error={form.name.error}
          />
          <TextInput
            label="Subdomain"
            placeholder="This will be used as your subdomain"
            value={form.slug.value}
            onChange={handleSlugChange}
            error={form.slug.error}
          />
        </S.InputsWrapper>
      </S.MainContainer>
      <ModalFooter>
        <S.ButtonsWrapper>
          <Button variant="secondary" label="Cancel" onClick={closeModal} />
          <Button
            variant="primary"
            label={
              create.isLoading || update.isLoading
                ? buttonLoadingLabel
                : buttonIdleLabel
            }
            isLoading={create.isLoading || update.isLoading}
            onClick={handleSave}
            disabled={!canSubmit || create.isLoading || update.isLoading}
          />
        </S.ButtonsWrapper>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditSiteModal;
