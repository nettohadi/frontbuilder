import React, { useState } from 'react';

import * as S from './styles';
import { MdDashboard } from 'react-icons/md';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import FloatingMenu from '@components/FloatingMenu';
import { current } from '@src/common/current';
import AddEditPageModal from '@src/pages/Editor/Modals/AddEditPageModal';
import AddEditSiteModal from '@src/pages/Editor/Modals/AddEditSiteModal';
import SiteList from '@src/pages/Editor/TopMenu/SiteMenu/SiteList';
import PageList from '@src/pages/Editor/TopMenu/SiteMenu/PageList';

const SiteMenu = () => {
  const [siteMenuIsVisible, showSiteMenu] = useState(false);
  const [pageMenuIsVisible, showPageMenu] = useState(false);
  const [pageModalIsVisible, showPageModal] = useState(false);
  const [siteModalIsVisible, showSiteModal] = useState(false);

  return (
    <>
      <S.SiteMenuWrapper>
        <MdDashboard size={27} />
        <FloatingMenu
          content={
            <SiteList
              isVisible={siteMenuIsVisible}
              onSelected={() => showSiteMenu(false)}
              onCreateSite={() => {
                showSiteMenu(false);
                showSiteModal(true);
              }}
            />
          }
          visible={siteMenuIsVisible}
          onClickOutside={() => showSiteMenu(false)}
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
              isVisible={pageMenuIsVisible}
              onSelected={() => showPageMenu(false)}
              onCreatePage={() => {
                showPageMenu(false);
                showPageModal(true);
              }}
            />
          }
          visible={pageMenuIsVisible}
          onClickOutside={() => showPageMenu(false)}
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
      {/* Website & Page Modal */}
      <AddEditPageModal
        isOpen={pageModalIsVisible}
        onClose={() => showPageModal(false)}
      />
      <AddEditSiteModal
        isOpen={siteModalIsVisible}
        onClose={() => showSiteModal(false)}
      />
    </>
  );
};

export default SiteMenu;
