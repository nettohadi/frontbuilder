import { TopPadding, RightPadding, LeftPadding, BottomPadding } from './styles';

const HighlightPadding = ({ padding }: any) => {
  return (
    <>
      <TopPadding height={padding.top + padding.unit} />
      <BottomPadding height={padding.bottom + padding.unit} />
      <LeftPadding width={padding.left + padding.unit} />
      <RightPadding width={padding.right + padding.unit} />
    </>
  );
};

export default HighlightPadding;
