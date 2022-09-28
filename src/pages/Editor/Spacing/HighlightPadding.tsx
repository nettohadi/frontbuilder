import { convertToNumber } from '@src/utils/helperFunctions';
import { TopPadding, RightPadding, LeftPadding, BottomPadding } from './styles';

const HighlightPadding = ({ getRect, padding }: any) => {
  const paddingValue = convertToNumber(padding);
  const rect = getRect();

  return (
    <>
      <TopPadding
        top={rect.y}
        left={rect.x}
        width={rect.width}
        height={paddingValue}
      />
      <BottomPadding
        bottom={rect.bottom}
        left={rect.x}
        width={rect.width}
        height={paddingValue}
      />
      <LeftPadding
        top={rect.y}
        left={rect.x}
        width={paddingValue}
        height={rect.height}
      />
      <RightPadding
        top={rect.y}
        left={rect.right - paddingValue}
        width={paddingValue}
        height={rect.height}
      />
    </>
  );
};

export default HighlightPadding;
