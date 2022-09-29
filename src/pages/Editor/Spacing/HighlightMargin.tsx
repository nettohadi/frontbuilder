import { useEffect, useState } from 'react';

import {
  TopMargin,
  BottomMargin,
  LeftMargin,
  RightMargin,
} from '@src/pages/Editor/Spacing/styles';
import { SpacingType } from '@src/types';

const HighlightMargin = ({
  getRect,
  margin,
}: {
  getRect: any;
  margin: SpacingType;
}) => {
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
        height={margin.top + margin.unit}
      />
      <BottomMargin
        bottom={rect.bottom}
        left={rect.x}
        width={rect.width}
        height={margin.bottom + margin.unit}
      />
      <LeftMargin
        top={rect.y}
        left={rect.x}
        width={margin.left + margin.unit}
        height={rect.height}
      />
      <RightMargin
        top={rect.y}
        left={rect.left + rect.width}
        width={margin.right + margin.unit}
        height={rect.height}
      />
    </>
  );
};

export default HighlightMargin;
