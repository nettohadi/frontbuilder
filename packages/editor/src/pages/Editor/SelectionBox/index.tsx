import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

const SelectionBox = () => {
  return (
    <>
      <LeftLine />
      <RightLine />
      <TopLine />
      <BottomLine />
    </>
  );
};

const Line = styled.div`
  position: absolute;
  border-left: 0.1px grey dotted;
  border-top: 0.1px grey dotted;
  z-index: 10;

  .selected > &,
  .hover-selected > & {
    border-left: 2px solid ${COLORS.SELECTED};
    border-top: 2px solid ${COLORS.SELECTED};
  }

  .hover-all > & {
    border-left: ${COLORS.DRAGOVER} solid 5px;
    border-top: ${COLORS.DRAGOVER} solid 5px;
  }
`;

const LeftLine = styled(Line)`
  top: 0;
  bottom: 0;
  left: 0;
  width: 0.1px;

  .hover-left > & {
    border-left: ${COLORS.DRAGOVER} solid 5px;
  }
`;

const RightLine = styled(Line)`
  top: 0;
  bottom: 0;
  right: 0;
  width: 0.1px;

  .hover-right > & {
    border-left: ${COLORS.DRAGOVER} solid 5px;
  }
`;

const TopLine = styled(Line)`
  top: 0;
  left: 0;
  right: 0;
  height: 0.1px;

  .hover-top > & {
    border-top: ${COLORS.DRAGOVER} solid 5px;
  }
`;

const BottomLine = styled(Line)`
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.1px;

  .hover-bottom > & {
    border-top: ${COLORS.DRAGOVER} solid 5px;
  }
`;

export default SelectionBox;
