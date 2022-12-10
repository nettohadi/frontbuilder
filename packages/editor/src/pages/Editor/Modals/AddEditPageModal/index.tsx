import * as S from './styles';
import Modal, { ModalFooter } from '@src/components/BaseModal';
import React, { useEffect } from 'react';
import TextInput from '@src/components/Inputs/TextInput';
import Button from '@src/components/Buttons';
import { current } from '@src/common/current';
import toast from 'react-hot-toast';
import usePageMutation from '@src/hooks/mutations/usePageMutation';
import { initialData } from '@src/data';
import { sanitizeForUrl } from '@src/utils/helperFunctions';

const PageModal = ({
  isOpen = false,
  onClose = () => {},
  pageId,
}: {
  isOpen: boolean;
  onClose: () => void;
  pageId?: string;
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
        value: sanitizeForUrl(e.target.value),
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

  const { create, update } = usePageMutation();

  const canSubmit =
    form.name.error === '' &&
    form.slug.error === '' &&
    form.name.value !== '' &&
    form.slug.value !== '';

  const handleSubmit = async () => {
    if (!pageId) {
      await create.mutateAsync({
        name: form.name.value,
        slug: form.slug.value,
        isDefault: false,
        user_id: current.user.id,
        website_id: current.website.id || 0,
        draft: initialData,
        published: {},
      });
    } else {
      await update.mutateAsync({
        id: pageId,
        name: form.name.value,
        slug: form.slug.value,
        isDefault: false,
        user_id: current.user.id,
        website_id: current.website.id || 0,
        draft: initialData,
        published: {},
      });
    }

    closeModal();
  };

  useEffect(() => {
    if (create.isSuccess) {
      toast.success('Page created successfully');
    }

    if (update.isSuccess) {
      toast.success('Page updated successfully');
    }

    if (create.error) {
      toast.error(String(create?.error) || 'Failed to create Page');
    }

    if (update.error) {
      toast.error('Failed to update Page');
    }
  }, [create.isSuccess, create.error, update.isSuccess, update.error]);

  const buttonIdleLabel = pageId ? 'Update' : 'Create';
  const buttonLoadingLabel = pageId ? 'Updating...' : 'Creating...';

  const closeModal = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Create a New Page">
      <S.MainContainer>
        <S.InputsWrapper>
          <TextInput
            label="Name"
            placeholder="Good name for your page"
            value={form.name.value}
            error={form.name.error}
            onChange={handleNameChange}
            focus={true}
          />
          <TextInput
            label="Slug"
            placeholder="This will be used as your page path"
            value={form.slug.value}
            error={form.slug.error}
            onChange={handleSlugChange}
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
            onClick={handleSubmit}
            disabled={!canSubmit}
          />
        </S.ButtonsWrapper>
      </ModalFooter>
    </Modal>
  );
};

export default PageModal;
