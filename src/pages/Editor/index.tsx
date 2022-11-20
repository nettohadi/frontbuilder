import React from 'react';

import * as S from './styles';
import * as G from '@src/styles';
import Render from '@components/Render';
import global from '@src/global';
import PageData from '@src/context';
import PropsEditor from '@components/PropsEditor';
import Tabs, { ActiveTabType } from '@src/pages/Editor/Tabs';
import TabContent from '@src/pages/Editor/Tabs/TabContent';
import TopMenu from '@src/pages/Editor/TopMenu';
import { useRender } from '@src/hooks';
import { current } from '@src/common/current';
import usePage from '@src/hooks/usePage';
import WithAuth from '@src/hocs/withAuth';

const Editor = () => {
  console.log('renders editor');
  const updateEditor = useRender();
  const [activeTab, setActiveTab] = React.useState<ActiveTabType>('elements');
  const changeTab = (tab: ActiveTabType) => {
    setActiveTab(tab);
  };

  global.setMode('edit', 'mode is set to edit');

  const { isLoading, page, error } = usePage();

  return (
    <PageData.Provider value={updateEditor}>
      <TopMenu />
      <S.EditorContainer>
        <S.LeftPanel>
          <Tabs activeTab={activeTab} changeTab={changeTab} />
          <TabContent activeTab={activeTab} />
        </S.LeftPanel>
        <S.Wrapper className="editor">
          <S.Canvas id="canvas" width={current.screenWidth}>
            {!isLoading && <Render element={page} parent={null} />}
            {!isLoading && error && (
              <G.ErrorMessageContainer>
                <h2>{error}</h2>
              </G.ErrorMessageContainer>
            )}
          </S.Canvas>
        </S.Wrapper>
        <S.RightPanel>
          <PropsEditor />
        </S.RightPanel>
      </S.EditorContainer>
    </PageData.Provider>
  );
};

export default WithAuth(Editor);
