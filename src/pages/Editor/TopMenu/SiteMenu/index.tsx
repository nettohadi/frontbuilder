import React, { useState } from 'react';

import * as S from './styles';
import { MdDashboard, MdInsertDriveFile } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';
import { BsCheck2 } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import FloatingMenu from '@components/FloatingMenu';
import * as G from '@src/styles';
import usePages from '@src/hooks/usePages';
import { current } from '@src/common/current';
import { useNavigate } from 'react-router-dom';
import PageModal from '@src/pages/Editor/Modals/PageModal';

const SiteMenu = () => {
  const [siteMenuIsVisible, showSiteMenu] = useState(false);
  const [pageMenuIsVisible, showPageMenu] = useState(false);
  const [modalIsVisible, showModal] = useState(false);

  return (
    <>
      <S.SiteMenuWrapper>
        <MdDashboard size={27} />
        <FloatingMenu
          content={<SiteList />}
          visible={siteMenuIsVisible}
          onClickOutside={() => showSiteMenu(false)}
          showArrow={true}
          placement={'bottom-start'}
        >
          <S.SiteNameWrapper onClick={() => showSiteMenu((s) => !s)}>
            <div>hadi-cool-site</div>
          </S.SiteNameWrapper>
        </FloatingMenu>
        <IoIosArrowForward />
        <FloatingMenu
          content={
            <PageList
              onSelected={() => showPageMenu(false)}
              onCreatePage={() => {
                showPageMenu(false);
                showModal(true);
              }}
            />
          }
          visible={pageMenuIsVisible}
          onClickOutside={() => showPageMenu(false)}
          showArrow={true}
          placement={'bottom-start'}
        >
          <S.SiteNameWrapper onClick={() => showPageMenu((s) => !s)}>
            {current.page?.name || '...'}
          </S.SiteNameWrapper>
        </FloatingMenu>
      </S.SiteMenuWrapper>
      <PageModal isOpen={modalIsVisible} onClose={() => showModal(false)} />
    </>
  );
};

export default SiteMenu;

const SiteList = ({ onSelected = () => {} }: any) => {
  return (
    <S.MenuWrapper>
      <S.MenuItem>
        <div>
          <MdDashboard size={15} />
          hadi-cool-site
        </div>
        <BsCheck2 />
      </S.MenuItem>
      <S.MenuItem>
        <div>
          <MdDashboard size={15} />
          hadi-new-site
        </div>
      </S.MenuItem>
      <G.Divider />
      <S.MenuItem>
        <div>
          <BiPlus /> Create New Site
        </div>
      </S.MenuItem>
    </S.MenuWrapper>
  );
};

const PageList = ({
  onSelected = () => {},
  onCreatePage = () => {},
}: {
  onSelected: () => void;
  onCreatePage: () => void;
}) => {
  const { isLoading, isFetching, data } = usePages();
  const navigate = useNavigate();

  const Pages = () => {
    if (isLoading || isFetching) {
      return (
        <S.MenuItem>
          <div>Loading...</div>
        </S.MenuItem>
      );
    }

    if (data?.length === 0) {
      return (
        <S.MenuItem>
          <div>No pages found</div>
        </S.MenuItem>
      );
    }

    return (
      <>
        {data?.map((page) => {
          return (
            <S.MenuItem
              onClick={() => {
                navigate(`/${current.websiteId}/${page.id}`);
                onSelected();
              }}
            >
              <div>
                <MdInsertDriveFile size={15} />
                {page.name}
              </div>
              {page.id === current.page.id && <BsCheck2 />}
            </S.MenuItem>
          );
        })}
      </>
    );
  };

  return (
    <S.MenuWrapper>
      <Pages />
      <G.Divider />
      <S.MenuItem>
        <div onClick={onCreatePage}>
          <BiPlus /> Create New Page
        </div>
      </S.MenuItem>
    </S.MenuWrapper>
  );
};
