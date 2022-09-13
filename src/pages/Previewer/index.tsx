import React from 'react';

import data from '@src/data';
import Render from '@components/Render';
import global from '@src/global';

export default function Previewer() {
  global.setEditMode(false, 'Previewer set editingMode to false');
  return (
    <>
      <Render element={data.get()} parent={null} />
    </>
  );
}
