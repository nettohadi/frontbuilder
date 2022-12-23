import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';

import usePages from '@src/hooks/queries/usePages';
import * as G from '@src/styles';
import * as S from './styles';
import { HeadingContainer } from '@src/pages/Editor/shared';
import Loading from '@components/Loading';
import FloatingMenu from '@components/FloatingMenu';
import AddEditPageModal, {
  FormDataType,
} from '@src/pages/Editor/Modals/AddEditPageModal';
import usePageMutation from '@src/hooks/mutations/usePageMutation';
import toast from 'react-hot-toast';
import Modal, { ModalFooter } from '@components/BaseModal';
import Button from '@components/Buttons';
import { current } from '@src/common/current';
import { BiPlus } from 'react-icons/bi';

const Pages = () => {
  const params = useParams<{ websiteId: string; pageId: string }>();
  const { isLoading, isFetching, data } = usePages(Number(params.websiteId));
  const [isMenuOpen, setIsMenuOpen] = useState('');
  const [pageModalIsVisible, showPageModal] = useState(false);
  const [pageToEdit, setPageToEdit] = useState<FormDataType>({
    id: { value: '', error: '' },
    name: { value: '', error: '' },
    slug: { value: '', error: '' },
  });
  const [confirmationIsOpen, showConfirmation] = useState(false);
  const navigate = useNavigate();
  const { setAsDefault, deleteById } = usePageMutation();

  useEffect(() => {
    if (setAsDefault.isLoading) {
      toast.loading('Setting as home page...');
    }

    if (deleteById.isSuccess) {
      toast.success('Page deleted successfully');
      deleteById.reset();
    }

    if (setAsDefault.isSuccess) {
      toast.dismiss();
      toast.success('Page set as home page');
      setAsDefault.reset();
    }
  }, [
    setAsDefault.isLoading,
    setAsDefault.isSuccess,
    deleteById.isSuccess,
    deleteById,
    setAsDefault,
  ]);

  const handleEdit = () => {
    setIsMenuOpen('');
    showPageModal(true);
  };

  const handleCreate = () => {
    setPageToEdit({
      id: { value: '', error: '' },
      name: { value: '', error: '' },
      slug: { value: '', error: '' },
    });
    showPageModal(true);
  };

  const handleDelete = () => {
    setIsMenuOpen('');
    if (data?.length === 1) {
      toast.error('You cannot delete the last page');
      return;
    }
    showConfirmation(true);
  };

  const handleSetAsDefault = async () => {
    setIsMenuOpen('');
    await setAsDefault.mutateAsync(pageToEdit.id?.value || '');
  };

  const shouldShowLoader = (isLoading || isFetching) && !data?.length;
  const shouldShowData = data?.length;

  return (
    <div>
      <HeadingContainer>Pages</HeadingContainer>
      <G.Divider color={'dark'} />
      <S.PagesContainer>
        {shouldShowLoader && (
          <Loading height="70px" size={14} text="Fetching pages ..." />
        )}
        {shouldShowData &&
          data?.map((page) => (
            <div key={page.id}>
              <S.PageItem>
                <div className="home-icon">
                  {page.isDefault && <FaHome size={15} />}
                </div>
                <div className="page-name">{page.name}</div>
                <FloatingMenu
                  content={
                    <PageMenu
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      handleSetAsDefault={handleSetAsDefault}
                    />
                  }
                  visible={isMenuOpen === page.id}
                  onClickOutside={() => setIsMenuOpen('')}
                  placement="bottom"
                  showArrow
                >
                  <div style={{ width: 20 }}>
                    <FiMoreVertical
                      size="14px"
                      cursor="pointer"
                      onClick={() => {
                        setPageToEdit({
                          id: { value: String(page.id), error: '' },
                          name: { value: page.name || '', error: '' },
                          slug: { value: page.slug || '', error: '' },
                        });
                        setIsMenuOpen(page.id || '');
                      }}
                    />
                  </div>
                </FloatingMenu>
              </S.PageItem>
              <G.Divider color={'light'} />
            </div>
          ))}
        {shouldShowData && (
          <S.PageItem onClick={handleCreate}>
            <div>
              <BiPlus /> Create a new page
            </div>
          </S.PageItem>
        )}
      </S.PagesContainer>
      <AddEditPageModal
        pageData={pageToEdit}
        isOpen={pageModalIsVisible}
        onClose={() => showPageModal(false)}
      />
      <DeleteConfirmationModal
        pageName={pageToEdit.name?.value || ''}
        isOpen={confirmationIsOpen}
        onClose={() => {
          showConfirmation(false);
        }}
        onDelete={async () => {
          await deleteById.mutateAsync(pageToEdit.id?.value || '');
          showConfirmation(false);
          if (pageToEdit.id?.value === current.page.id) {
            const page =
              data?.find((page) => page.isDefault) || data?.[0] || {};
            current.page = page;
            navigate(`/${current.website.id}/${page?.id}`);
          }
        }}
        isLoading={deleteById.isLoading}
      />
    </div>
  );
};

export default Pages;

const PageMenu = ({
  handleEdit,
  handleDelete,
  handleSetAsDefault,
}: {
  handleEdit: () => void;
  handleDelete: () => void;
  handleSetAsDefault: () => void;
}) => {
  return (
    <S.MenuContainer>
      <S.MenuItem onClick={handleEdit}>Edit</S.MenuItem>
      <S.MenuItem onClick={handleDelete}>Delete</S.MenuItem>
      <S.MenuItem onClick={handleSetAsDefault}>Set as home page</S.MenuItem>
    </S.MenuContainer>
  );
};

const DeleteConfirmationModal = ({
  pageName,
  isOpen,
  onClose,
  onDelete,
  isLoading,
}: {
  pageName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Confirmation'}>
      <div>
        <S.ConformationContainer>
          Do you really want to delete {pageName}? This action cannot be undone.
        </S.ConformationContainer>
        <ModalFooter>
          <Button label={'Cancel'} variant={'primary'} onClick={onClose} />
          <Button
            label={isLoading ? 'Deleting...' : 'Delete'}
            variant={'secondary'}
            onClick={onDelete}
            isLoading={isLoading}
          />
        </ModalFooter>
      </div>
    </Modal>
  );
};
