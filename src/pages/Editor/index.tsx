import React from 'react';

import * as S from './styles';
import data from '@src/data';
import Render from '@components/Render';
import global from '@src/global';
import PageData from '@src/context';
import PropsEditor from '@components/PropsEditor';
import Tabs, { ActiveTabType } from '@src/pages/Editor/Tabs';
import TabContent from '@src/pages/Editor/Tabs/TabContent';
import TopMenu from '@src/pages/Editor/TopMenu';
import { useRender } from '@src/hooks';

export default function Editor() {
  console.log('renders editor');
  const updateEditor = useRender();
  const [activeTab, setActiveTab] = React.useState<ActiveTabType>('navigator');
  const changeTab = (tab: ActiveTabType) => {
    setActiveTab(tab);
  };

  global.setMode('edit', 'mode is set to edit');

  return (
    <PageData.Provider value={updateEditor}>
      <TopMenu />
      <S.EditorContainer>
        <S.LeftPanel>
          <Tabs activeTab={activeTab} changeTab={changeTab} />
          <TabContent activeTab={activeTab} />
        </S.LeftPanel>
        <S.Canvas id="canvas">
          <Render element={data.get()} parent={null} />
        </S.Canvas>
        <S.RightPanel>
          <PropsEditor />
        </S.RightPanel>
      </S.EditorContainer>
    </PageData.Provider>
  );
}
