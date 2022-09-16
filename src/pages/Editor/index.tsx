import React from 'react';

import './index.css';
import data from '@src/data';
import Render from '@components/Render';
import global from '@src/global';
import PageData from '@src/context';
import ElementContainer from './ElementContainer';

export default function Editor() {
  console.log('renders editor');
  global.setEditMode(true, 'Editor set editingMode to true');
  const [state, rerender] = React.useState<boolean>(false);

  React.useEffect(() => {
    data.persistToLocalStorage();
  }, [state]);

  return (
    <PageData.Provider value={() => rerender((s) => !s)}>
      <div className="editor-wrapper">
        <ElementContainer />
        <Render element={data.get()} parent={null} />
      </div>
    </PageData.Provider>
  );
}
