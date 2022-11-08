import { current } from '@src/common/current';
import Render from '@components/Render';
import data from '@src/data';
import * as S from '@src/pages/Editor/styles';
import React, { useCallback, useContext, useEffect } from 'react';
import PageData from '@src/context';
import { useRender } from '@src/hooks';

import { updateElementProp } from '@src/global/element';

// @ts-ignore
window.currentData = current;
// @ts-ignore
window.updateElementProp = updateElementProp;
// @ts-ignore
window.data = data;

const Canvas = () => {
  const renderCanvas = useRender();
  console.log('renders canvas');
  const handleMessage = useCallback((e: any) => {
    console.log('message from editor', { device: current.deviceWidth });

    // renderCanvas();
  }, []);
  const RenderCanvas = () => {
    // @ts-ignore
    window.top.postMessage('rerender editor', '*');
    console.log('render canvas');
    renderCanvas();
  };
  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <PageData.Provider value={RenderCanvas}>
      <S.Canvas id="canvas" className="editor" width={'100%'}>
        <Render element={data.get()} parent={null} />
      </S.Canvas>
    </PageData.Provider>
  );
};

export default Canvas;
