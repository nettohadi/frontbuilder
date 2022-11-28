import * as S from './styles';
import Modal, { ModalFooter } from '@components/BaseModal';
import React, { useEffect } from 'react';
import TextInput from '@components/Inputs/TextInput';
import Button from '@components/Buttons';
import { current } from '@src/common/current';
import toast from 'react-hot-toast';
import usePageMutation from '@src/hooks/mutations/usePageMutation';
import { initialData } from '@src/data';

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

  const { create, update } = usePageMutation();

  const handleSave = async () => {
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
            onChange={handleNameChange}
            focus={true}
          />
          <TextInput
            label="Slug"
            placeholder="This will be used as your page path"
            value={form.slug.value}
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
            onClick={handleSave}
          />
        </S.ButtonsWrapper>
      </ModalFooter>
    </Modal>
  );
};

export default PageModal;
