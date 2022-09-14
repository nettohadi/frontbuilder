import React from 'react';

import data from '@src/data';
import Render from '@components/Render';
import global from '@src/global';
import PageData from '@src/context';

export default function Editor() {
  console.log('renders editor');
  global.setEditMode(true, 'Editor set editingMode to true');
  const [state, rerender] = React.useState<boolean>(false);

  React.useEffect(() => {
    data.persistToLocalStorage();
  }, [state]);

  return (
    <PageData.Provider value={() => rerender((s) => !s)}>
      <Render element={data.get()} parent={null} />
    </PageData.Provider>
  );
}
