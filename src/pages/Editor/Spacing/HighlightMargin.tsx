import {
  TopMargin,
  BottomMargin,
  LeftMargin,
  RightMargin,
} from '@src/pages/Editor/Spacing/styles';
import { SpacingType } from '@src/types';

const HighlightMargin = ({ margin }: { margin: SpacingType }) => {
  return (
    <>
      <TopMargin height={margin.top + margin.unit} />
      <BottomMargin height={margin.bottom + margin.unit} />
      <LeftMargin width={margin.left + margin.unit} />
      <RightMargin width={margin.right + margin.unit} />
    </>
  );
};

export default HighlightMargin;
