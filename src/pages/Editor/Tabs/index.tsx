import React from 'react';

import * as S from './styles';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { ImCog } from 'react-icons/im';
import { FaSitemap } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

import User from '@src/pages/Editor/User';

export type ActiveTabType = 'elements' | 'gallery' | 'navigator' | 'settings';

type TabsProp = {
  activeTab: ActiveTabType;
  changeTab: (activeTab: ActiveTabType) => void;
};

export default function Tabs({ activeTab, changeTab }: TabsProp) {
  return (
    <S.TabWrapper>
      <S.TabsContainer>
        <S.Tab
          isSelected={activeTab === 'elements'}
          onClick={() => changeTab('elements')}
        >
          <BsFillPlusSquareFill />
        </S.Tab>
        <S.Tab
          isSelected={activeTab === 'navigator'}
          onClick={() => changeTab('navigator')}
        >
          <FaSitemap />
        </S.Tab>
        <S.Tab
          isSelected={activeTab === 'gallery'}
          onClick={() => changeTab('gallery')}
        >
          <MdLibraryBooks />
        </S.Tab>
        <S.Tab
          isSelected={activeTab === 'settings'}
          onClick={() => changeTab('settings')}
        >
          <ImCog />
        </S.Tab>
      </S.TabsContainer>
      <User />
    </S.TabWrapper>
  );
}
