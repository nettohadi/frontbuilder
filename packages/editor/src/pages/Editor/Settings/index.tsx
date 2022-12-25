import { HeadingContainer } from '../shared';
import * as G from '@src/styles';
import React, { useEffect } from 'react';
import TextInput from '@components/Inputs/TextInput';
import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { current } from '@src/common/current';
import Button from '@components/Buttons';
import { sanitizeForUrl } from '@src/utils/helperFunctions';
import useWebsiteMutation from '@src/hooks/mutations/useWebsiteMutation';
import toast from 'react-hot-toast';
import { useEditor } from '@src/hooks/useEditor';

const Settings = () => {
  const [form, setForm] = React.useState({
    name: { value: current.website.name || '', error: '' },
    slug: { value: current.website.slug || '', error: '' },
  });
  const { update } = useWebsiteMutation();
  const rerenderEditor = useEditor();

  const resetForm = () => {
    setForm({
      name: { value: current.website.name || '', error: '' },
      slug: { value: current.website.slug || '', error: '' },
    });
  };

  useEffect(() => {
    if (update.isSuccess) {
      toast.success('Website updated successfully');
      rerenderEditor();
    }

    if (update.error) {
      toast.error(String(update.error) || 'Error updating website');
      resetForm();
    }
  }, [update.isSuccess, update.error, rerenderEditor]);

  const validate = (value: any) => {
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
        error: validate(e.target.value),
      },
      name: { value: e.target.value, error: validate(e.target.value) },
    };
    setForm(newForm);
  };

  const handleSubdomainChange = (e: any) => {
    const newForm = {
      ...form,
      slug: {
        value: sanitizeForUrl(e.target.value),
        error: validate(e.target.value),
      },
    };
    setForm(newForm);
  };

  const handleSave = async () => {
    const updatedWebsite = await update.mutateAsync({
      id: current.website.id,
      name: form.name.value,
      slug: form.slug.value,
      isDefault: false,
      user_id: current.user.id,
    });

    if (updatedWebsite) {
      current.website = updatedWebsite;
    }
  };

  const canSave =
    current.website.name !== form.name.value ||
    current.website.slug !== form.slug.value;

  return (
    <>
      <HeadingContainer>Settings</HeadingContainer>
      <G.Divider color={'dark'} />
      <MainContainer>
        <TextInput
          label="Site Name"
          placeholder="Good name for your site"
          value={form.name.value}
          onChange={handleNameChange}
          focus={true}
          error={form.name.error}
        />
        <TextInput
          label="Subdomain"
          placeholder="Your subdomain"
          value={form.slug.value}
          onChange={handleSubdomainChange}
          focus={true}
          error={form.slug.error}
        />
        <ButtonsWrapper>
          <Button
            isLoading={update.isLoading}
            variant="primary"
            label={update.isLoading ? 'Saving...' : 'Save'}
            onClick={handleSave}
            disabled={!canSave}
          />
        </ButtonsWrapper>
      </MainContainer>
    </>
  );
};

export default Settings;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${COLORS.WHITE_TEXT};
  gap: 10px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
`;
