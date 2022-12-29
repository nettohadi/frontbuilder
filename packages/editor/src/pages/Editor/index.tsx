import React from 'react';

import * as S from './styles';
import * as G from '@src/styles';
import Renderer from '@frontbuilder/renderer';
import PageData from '@src/context';
import PropsEditor from '@src/components/PropsEditor';
import Tabs, { ActiveTabType } from '@src/pages/Editor/Tabs';
import TabContent from '@src/pages/Editor/Tabs/TabContent';
import TopMenu from '@src/pages/Editor/TopMenu';
import { useRender } from '@src/hooks';
import { current } from '@src/common/current';
import usePage from '@src/hooks/usePage';
import WithAuth from '@src/hocs/withAuth';
import { Toaster } from 'react-hot-toast';
import { COLORS } from '@src/global/variables';
import Loading from '@components/Loading';

const Editor = () => {
  console.log('renders editor');
  const updateEditor = useRender();
  const [activeTab, setActiveTab] = React.useState<ActiveTabType>('elements');
  const changeTab = (tab: ActiveTabType) => {
    setActiveTab(tab);
  };

  const { isLoading, page, error } = usePage();
  console.log({ page });

  return (
    <PageData.Provider value={updateEditor}>
      <div>
        <Toast />
      </div>
      <TopMenu />
      <S.EditorContainer>
        <S.LeftPanel>
          <Tabs activeTab={activeTab} changeTab={changeTab} />
          <TabContent activeTab={activeTab} />
        </S.LeftPanel>
        <S.Wrapper className="editor">
          <S.Canvas id="canvas" width={current.screenWidth}>
            {isLoading && (
              <Loading
                color="white"
                height="500px"
                size={25}
                text="Loading data..."
              />
            )}

            {!isLoading && <Renderer element={page} parent={null} />}

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

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          backgroundColor: COLORS.INPUT_BACKGROUND(),
          color: 'whitesmoke',
        },
      }}
    />
  );
};
