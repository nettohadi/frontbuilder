import React, { useCallback, useEffect } from 'react';
import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiArrowNarrowUp,
  HiArrowNarrowDown,
} from 'react-icons/hi';

import * as S from './styles';
import { debounce, getRoundValue } from '@src/utils/helperFunctions';

const ElementInfo = ({ width, height }: any) => {
  const [showWidth, setShowWidth] = React.useState(false);
  const [showHeight, setShowHeight] = React.useState(false);

  // eslint-disable-next-line
  const debouncedHideWidth = useCallback(
    debounce(() => {
      setShowWidth(false);
    }),
    []
  );

  // eslint-disable-next-line
  const debouncedHideHeight = useCallback(
    debounce(() => {
      setShowHeight(false);
    }),
    []
  );

  useEffect(() => {
    debouncedHideWidth();
    setShowWidth(true);
  }, [width, debouncedHideWidth]);

  useEffect(() => {
    debouncedHideHeight();
    setShowHeight(true);
  }, [height, debouncedHideHeight]);

  useEffect(() => {
    setShowHeight(false);
    setShowWidth(false);
  }, []);

  return (
    <>
      {showWidth && (
        <S.ElementWidthLine>
          <HiArrowNarrowLeft />
          <S.ElementWidthInfo>{getRoundValue(width)}</S.ElementWidthInfo>
          <HiArrowNarrowRight />
        </S.ElementWidthLine>
      )}
      {showHeight && (
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
