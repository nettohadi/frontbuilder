import React, { useCallback, useEffect, useRef } from 'react';

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
import { current } from '@src/common/current';

// @ts-ignore
globalThis.data = data;

export default function Editor() {
  console.log('renders editor');
  const updateEditor = useRender();
  const [activeTab, setActiveTab] = React.useState<ActiveTabType>('elements');
  const changeTab = (tab: ActiveTabType) => {
    setActiveTab(tab);
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  global.setMode('edit', 'mode is set to edit');

  const handleMessage = useCallback((e: any) => {
    switch (e.data) {
      case 'rerender editor':
        updateEditor();
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <PageData.Provider value={updateEditor}>
      <TopMenu />
      <S.EditorContainer>
        <S.LeftPanel $data={{}}>
          <Tabs activeTab={activeTab} changeTab={changeTab} />
          <TabContent activeTab={activeTab} />
        </S.LeftPanel>

        {/*<S.Canvas id="canvas" className="editor" width={current.deviceWidth}>*/}
        {/*  <Render element={data.get()} parent={null} />*/}
        {/*</S.Canvas>*/}
        <iframe
          name="canvasFrame"
          src={'http://localhost:3000/canvas'}
          title="iframe"
          style={{ width: current.deviceWidth }}
          ref={iframeRef}
        />

        <S.RightPanel>
          <PropsEditor />
        </S.RightPanel>
      </S.EditorContainer>
    </PageData.Provider>
  );
}
