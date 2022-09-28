import { useEffect, useState } from 'react';

import {
  TopMargin,
  BottomMargin,
  LeftMargin,
  RightMargin,
} from '@src/pages/Editor/Spacing/styles';

const HighlightMargin = ({ getRect, margin, wrapperRef }: any) => {
  const [rect, setRect] = useState<any>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
  });

  useEffect(() => {
    setRect(getRect());
  }, [getRect]);

  return (
    <>
      <TopMargin
        top={rect.y}
        left={rect.x}
        width={rect.width}
        height={margin}
      />
      <BottomMargin
        bottom={rect.bottom}
        left={rect.x}
        width={rect.width}
        height={margin}
      />
      <LeftMargin
        top={rect.y}
        left={rect.x}
        width={margin}
        height={rect.height}
      />
      <RightMargin
        top={rect.y}
        left={rect.right - Number(String(margin).replace('px', ''))}
        width={margin}
        height={rect.height}
      />
    </>
  );
};

export default HighlightMargin;
