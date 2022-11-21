import React, { useState } from 'react';

import * as S from './styles';
import { MdDashboard, MdInsertDriveFile } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';
import { BsCheck2 } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import FloatingMenu from '@components/FloatingMenu';
import * as G from '@src/styles';

const SiteMenu = () => {
  const [siteMenuIsVisible, ShowSiteMenu] = useState(false);
  const [pageMenuIsVisible, ShowPageMenu] = useState(false);
  return (
    <>
      <S.SiteMenuWrapper>
        <MdDashboard size={27} />
        <FloatingMenu
          content={<SiteList />}
          visible={siteMenuIsVisible}
          onClickOutside={() => ShowSiteMenu(false)}
          showArrow={true}
        >
          <S.SiteNameWrapper onClick={() => ShowSiteMenu((s) => !s)}>
            <div>hadi-cool-site</div>
          </S.SiteNameWrapper>
        </FloatingMenu>
        <IoIosArrowForward />
        <FloatingMenu
          content={<PageList />}
          visible={pageMenuIsVisible}
          onClickOutside={() => ShowPageMenu(false)}
          showArrow={true}
        >
          <S.SiteNameWrapper onClick={() => ShowPageMenu((s) => !s)}>
            about
          </S.SiteNameWrapper>
        </FloatingMenu>
      </S.SiteMenuWrapper>
    </>
  );
};

export default SiteMenu;

const SiteList = () => {
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

const PageList = () => {
  return (
    <S.MenuWrapper>
      <S.MenuItem>
        <div>
          <MdInsertDriveFile size={15} />
          Home
        </div>
      </S.MenuItem>
      <S.MenuItem>
        <div>
          <MdInsertDriveFile size={15} />
          About
        </div>
        <BsCheck2 />
      </S.MenuItem>
      <G.Divider />
      <S.MenuItem>
        <div>
          <BiPlus /> Create New Page
        </div>
      </S.MenuItem>
    </S.MenuWrapper>
  );
};
