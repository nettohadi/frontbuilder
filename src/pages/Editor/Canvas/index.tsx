import { current } from '@src/common/current';
import Render from '@components/Render';
// import data from '@src/data';
import * as S from '@src/pages/Editor/styles';
import React, { useCallback, useContext, useEffect } from 'react';
import PageData from '@src/context';
import { useRender } from '@src/hooks';
import { ElementType } from '@src/types';

// @ts-ignore
const data: ElementType = globalThis.data;

const Canvas = () => {
  const renderCanvas = useRender();
  console.log('renders canvas');
  const handleMessage = useCallback((e: any) => {
    console.log('message from editor', { device: current.deviceWidth });

    // renderCanvas();
  }, []);

  useEffect(() => {
    console.log('add event listener');
    window.addEventListener('message', handleMessage);

    // @ts-ignore
    console.log(globalThis.testData);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <PageData.Provider value={renderCanvas}>
      <S.Canvas id="canvas" className="editor" width={'100%'}>
        <Render element={data.get()} parent={null} />
      </S.Canvas>
    </PageData.Provider>
  );
};

export default Canvas;
