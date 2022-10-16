import React, { useEffect } from 'react';
import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiArrowNarrowUp,
  HiArrowNarrowDown,
} from 'react-icons/hi';

import * as S from './styles';
import { debounce, roundSize } from '@src/utils/helperFunctions';
import { current } from '@src/common/current';

const ElementInfo = ({ width, height, isSelected }: any) => {
  useEffect(() => {
    debouncedHideElementSize();
  }, [width, height]);

  const isResizingWidth = current.isResizing().width && isSelected && width;
  const isResizingHeight = current.isResizing().height && isSelected && height;

  return (
    <>
      {isResizingWidth && (
        <S.ElementWidthLine>
          <HiArrowNarrowLeft />
          <S.ElementWidthInfo>{roundSize(width)}</S.ElementWidthInfo>
          <HiArrowNarrowRight />
        </S.ElementWidthLine>
      )}
      {isResizingHeight && (
        <S.ElementHeightLine>
          <HiArrowNarrowUp />
          <S.ElementHeightInfo>{roundSize(height)}</S.ElementHeightInfo>
          <HiArrowNarrowDown />
        </S.ElementHeightLine>
      )}
    </>
  );
};

export default ElementInfo;

const debouncedHideElementSize = debounce(() => {
  current.setIsResizing({ width: false, height: false });
  current.getRerender()();
});
