import React, { useState } from 'react';

import * as S from './styles';
import { MdDashboard, MdInsertDriveFile } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';
import { BsCheck2 } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import FloatingMenu from '@components/FloatingMenu';
import * as G from '@src/styles';
import usePages from '@src/hooks/usePages';
import { current } from '@src/common/current';
import { useNavigate, useParams } from 'react-router-dom';
import PageModal from '@src/pages/Editor/Modals/PageModal';
import useWebsites from '@src/hooks/useWebsites';

const SiteMenu = () => {
  const [siteMenuIsVisible, showSiteMenu] = useState(false);
  const [pageMenuIsVisible, showPageMenu] = useState(false);
  const [modalIsVisible, showModal] = useState(false);

  return (
    <>
      <S.SiteMenuWrapper>
        <MdDashboard size={27} />
        <FloatingMenu
          content={<SiteList onSelected={() => showSiteMenu(false)} />}
          visible={siteMenuIsVisible}
          onClickOutside={() => showSiteMenu(false)}
          showArrow={true}
          placement={'bottom-start'}
        >
          <S.SiteNameWrapper onClick={() => showSiteMenu((s) => !s)}>
            <div>
              <div>{current.website?.name || '...'} </div>
            </div>
            <MdOutlineKeyboardArrowDown size={18} />
          </S.SiteNameWrapper>
        </FloatingMenu>
        {'/'}
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
            <div>
              <div>{current.page?.name || '...'}</div>
            </div>
            <MdOutlineKeyboardArrowDown size={18} />
          </S.SiteNameWrapper>
        </FloatingMenu>
      </S.SiteMenuWrapper>
      <PageModal isOpen={modalIsVisible} onClose={() => showModal(false)} />
    </>
  );
};

export default SiteMenu;

const SiteList = ({ onSelected = () => {} }: any) => {
  const { isLoading, isFetching, data } = useWebsites();
  const navigate = useNavigate();

  const Websites = () => {
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

    const isActive = (websiteId: number) => {
      return current.website?.id === websiteId;
    };

    return (
      <>
        {data?.map((website) => {
          return (
            <S.MenuItem
              key={website.id}
              onClick={() => {
                navigate(`/${website.id}`);
                current.website = website;
                onSelected();
              }}
            >
              <div>
                <MdInsertDriveFile size={15} />
                {website.name}
              </div>
              {isActive(website.id) && <BsCheck2 />}
            </S.MenuItem>
          );
        })}
      </>
    );
  };

  return (
    <S.MenuWrapper>
      <Websites />
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
  const params = useParams<{ websiteId: string; pageId: string }>();
  const { isLoading, isFetching, data } = usePages(Number(params.websiteId));
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
              key={page.id}
              onClick={() => {
                navigate(`/${current.website.id}/${page.id}`);
                current.page = page;
                onSelected();
              }}
            >
              <div>
                <MdInsertDriveFile size={15} />
                {page.name}
              </div>
              {page.id === current.page?.id && <BsCheck2 />}
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
