import React from 'react';
import Render from '@components/Render';
import global from '@src/global';
import usePage from '@src/hooks/usePage';

export default function Previewer() {
  global.setMode('preview', 'Previewer set editingMode to false');
  const { isLoading, page } = usePage();
  return <>{!isLoading && <Render element={page} parent={null} />}</>;
}
