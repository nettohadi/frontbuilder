import { convertToNumber } from '@src/utils/helperFunctions';
import { TopPadding, RightPadding, LeftPadding, BottomPadding } from './styles';

const HighlightPadding = ({ getRect, padding }: any) => {
  const rect = getRect();

  return (
    <>
      <TopPadding
        top={rect.y}
        left={rect.x}
        width={rect.width}
        height={padding.top + padding.unit}
      />
      <BottomPadding
        bottom={rect.bottom}
        left={rect.x}
        width={rect.width}
        height={padding.bottom + padding.unit}
      />
      <LeftPadding
        top={rect.y}
        left={rect.x}
        width={padding.left + padding.unit}
        height={rect.height}
      />
      <RightPadding
        top={rect.y}
        left={rect.right}
        width={padding.right + padding.unit}
        height={rect.height}
      />
    </>
  );
};

export default HighlightPadding;
