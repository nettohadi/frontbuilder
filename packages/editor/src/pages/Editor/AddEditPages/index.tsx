import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { FiMoreVertical } from 'react-icons/fi';
import { SlHome } from 'react-icons/sl';

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
import toast from "react-hot-toast";

const Pages = () => {
  const params = useParams<{ websiteId: string; pageId: string }>();
  const { isLoading, data } = usePages(Number(params.websiteId));
  const [isMenuOpen, setIsMenuOpen] = useState('');
  const [pageModalIsVisible, showPageModal] = useState(false);
  const [pageToEdit, setPageToEdit] = useState<FormDataType>({
    id: { value: '', error: '' },
    name: { value: '', error: '' },
    slug: { value: '', error: '' },
  });
  const { setAsDefault } = usePageMutation();

  const PageMenu = () => {
    return (
      <S.MenuContainer>
        <S.MenuItem
          onClick={() => {
            setIsMenuOpen('');
            showPageModal(true);
          }}
        >
          Edit
        </S.MenuItem>
        <S.MenuItem>Delete</S.MenuItem>
        <S.MenuItem
          onClick={async () => {
            setIsMenuOpen('');
            await setAsDefault.mutateAsync(pageToEdit.id?.value || '');
          }}
        >
          Set as default
        </S.MenuItem>
      </S.MenuContainer>
    );
  };

  useEffect(() => {
      if(setAsDefault.isLoading){
          toast.loading('Setting as default...');
      }

      if(setAsDefault.isSuccess){
          toast.dismiss();
          toast.success('Page set as default');
      }
  },[setAsDefault.isLoading, setAsDefault.isSuccess])

  return (
    <div>
      <HeadingContainer>Pages</HeadingContainer>
      <G.Divider color={'dark'} />
      <S.PagesContainer>
        {isLoading && <Loading height="70px" text="Loading pages ..." />}
        {!isLoading &&
          data?.map((page) => (
            <>
              <S.PageItem>
                <div className="home-icon">
                  {page.isDefault && <SlHome size={13} />}
                </div>
                <div className="page-name">{page.name}</div>
                <FloatingMenu
                  content={<PageMenu />}
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
            </>
          ))}
      </S.PagesContainer>
      <AddEditPageModal
        pageData={pageToEdit}
        isOpen={pageModalIsVisible}
        onClose={() => showPageModal(false)}
      />
    </div>
  );
};

export default Pages;
