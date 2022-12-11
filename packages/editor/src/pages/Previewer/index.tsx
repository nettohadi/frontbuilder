import React from 'react';
import Render from '@frontbuilder/renderer';
import usePage from '@src/hooks/usePage';

export default function Previewer() {
  const { isLoading, page } = usePage();
  return <>{!isLoading && <Render element={page} parent={null} />}</>;
}
