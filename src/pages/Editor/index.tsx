import React, { useEffect } from 'react';

import './index.css';
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
  const [activeTab, setActiveTab] = React.useState<ActiveTabType>('elements');
  const changeTab = (tab: ActiveTabType) => {
    setActiveTab(tab);
  };

  global.setMode('edit', 'mode is set to edit');

  return (
    <PageData.Provider value={updateEditor}>
      <TopMenu />
      <div className="editor-wrapper">
        <div id="edit-box">
          <Tabs activeTab={activeTab} changeTab={changeTab} />
          <TabContent activeTab={activeTab} />
        </div>
        <div id="canvas">
          <Render element={data.get()} parent={null} />
        </div>
        <div id="style-panel">
          <PropsEditor />
        </div>
      </div>
    </PageData.Provider>
  );
}
