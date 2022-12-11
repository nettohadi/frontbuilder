import React from 'react';
import Renderer from '@frontbuilder/renderer';
import usePage from '@src/hooks/usePage';

export default function Previewer() {
  const { isLoading, page } = usePage();
  return <>{!isLoading && <Renderer element={page} parent={null} />}</>;
}
