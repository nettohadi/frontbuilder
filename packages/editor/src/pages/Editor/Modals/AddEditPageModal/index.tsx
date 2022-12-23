import * as S from './styles';
import Modal, { ModalFooter } from '@src/components/BaseModal';
import React, { useEffect, useState } from 'react';
import TextInput from '@src/components/Inputs/TextInput';
import Button from '@src/components/Buttons';
import { current } from '@src/common/current';
import toast from 'react-hot-toast';
import usePageMutation from '@src/hooks/mutations/usePageMutation';
import { initialData } from '@src/data';
import { sanitizeForUrl } from '@src/utils/helperFunctions';

export type FormDataType = {
  id?: { value: string; error?: string };
  name: { value: string; error?: string };
  slug: { value: string; error?: string };
};

const emptyData: FormDataType = {
  id: { value: '', error: '' },
  name: { value: '', error: '' },
  slug: { value: '', error: '' },
};

const PageModal = ({
  isOpen = false,
  onClose = () => {},
  pageId,
  pageData = emptyData,
}: {
  isOpen: boolean;
  onClose: () => void;
  pageId?: string;
  pageData?: FormDataType;
}) => {
  const [form, setForm] = useState(pageData);

  useEffect(() => setForm(pageData), [pageData]);

  const resetForm = () => {
    setForm(emptyData);
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
      ...form,
      slug: {
        value: sanitizeForUrl(
          String(e.target.value).replaceAll(' ', '-').toLowerCase()
        ),
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
        value: sanitizeForUrl(e.target.value).toLowerCase(),
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
    if (!form.id?.value) {
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
        id: form.id.value,
        name: form.name.value,
        slug: form.slug.value,
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

  const buttonIdleLabel = form.id?.value ? 'Update' : 'Create';
  const buttonLoadingLabel = form.id?.value ? 'Updating...' : 'Creating...';

  const closeModal = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={pageData?.id?.value ? 'Edit page' : 'Create a new page'}
    >
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
