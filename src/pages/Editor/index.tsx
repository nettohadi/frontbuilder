import React from 'react';

import data from '@src/data';
import Render from '@components/Render';
import global from '@src/global';

export default function Editor() {
  global.setEditMode(true, 'Editor set editingMode to true');
  return (
    <>
      <Render element={data.get()} parent={null} />
    </>
  );
}
