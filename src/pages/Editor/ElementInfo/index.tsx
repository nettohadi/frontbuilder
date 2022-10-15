import React from 'react';
import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiArrowNarrowUp,
  HiArrowNarrowDown,
} from 'react-icons/hi';

import * as S from './styles';
import { getRoundValue } from '@src/utils/helperFunctions';
import { current } from '@src/common/current';

const ElementInfo = ({ width, height, isSelected }: any) => {
  const isResizingWidth = current.isResizing().width && isSelected;
  const isResizingHeight = current.isResizing().height && isSelected;
  return (
    <>
      {isResizingWidth && (
        <S.ElementWidthLine>
          <HiArrowNarrowLeft />
          <S.ElementWidthInfo>{getRoundValue(width)}</S.ElementWidthInfo>
          <HiArrowNarrowRight />
        </S.ElementWidthLine>
      )}
      {isResizingHeight && (
        <S.ElementHeightLine>
          <HiArrowNarrowUp />
          <S.ElementHeightInfo>{getRoundValue(height)}</S.ElementHeightInfo>
          <HiArrowNarrowDown />
        </S.ElementHeightLine>
      )}
    </>
  );
};

export default ElementInfo;
