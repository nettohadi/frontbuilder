import React from 'react';

import * as S from './styles';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { ImStack, ImImages, ImCog } from 'react-icons/im';

export type ActiveTabType = 'elements' | 'gallery' | 'navigator' | 'settings';

type TabsProp = {
  activeTab: ActiveTabType;
  changeTab: (activeTab: ActiveTabType) => void;
};

export default function Tabs({ activeTab, changeTab }: TabsProp) {
  return (
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
        <ImStack />
      </S.Tab>
      <S.Tab
        isSelected={activeTab === 'gallery'}
        onClick={() => changeTab('gallery')}
      >
        <ImImages />
      </S.Tab>
      <S.Tab
        isSelected={activeTab === 'settings'}
        onClick={() => changeTab('settings')}
      >
        <ImCog />
      </S.Tab>
    </S.TabsContainer>
  );
}
