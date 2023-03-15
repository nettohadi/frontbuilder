import styled from 'styled-components';
import { COLORS } from '@src/global/variables';
import { current } from '@src/common/current';

const SelectionBox = () => {
  return (
    <>
      <LeftLine />
      <RightLine />
      <TopLine />
      <BottomLine />
      <DropPositionInfo />
    </>
  );
};

const DropPositionInfo = styled.div`
  position: fixed;
  top: 60px;
  left: calc(50% - 100px);
  right: auto;
  width: 200px;
  height: 30px;
  background-color: rgb(117, 113, 113);
  color: whitesmoke;
  border: 1px solid rgba(52, 52, 52, 0.92);
  border-radius: 8px;
  text-align: center;
  display: none;
  font-size: 14px;
  line-height: 20px;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 30%) 0px 8px 10px 1px, rgb(0 0 0 / 30%) 0px 3px 14px 2px;

  .hover-all > &,
  .hover-left > &,
  .hover-right > &,
  .hover-top > &,
  .hover-bottom > & {
    display: flex;
  }

  z-index: 100;

  .hover-all > &:before {
    content: 'Insert inside element';
  }

  .hover-left > &:before,
  .hover-top > &:before {
    content: 'Insert before element';
  }

  .hover-right > &:before,
  .hover-bottom > &:before {
    content: 'Insert after element';
  }
`;

const Line = styled.div`
  position: absolute;
  border-left: ${() => (current.xrayMode ? '0.1px grey dotted' : 'none')};
  border-top: ${() => (current.xrayMode ? '0.1px grey dotted' : 'none')};
  z-index: 10;

  .selected > &,
  .hover-selected > & {
    border-left: 2px solid ${COLORS.SELECTED};
    border-top: 2px solid ${COLORS.SELECTED};
  }

  .hover-all > & {
    // border-left: ${COLORS.DRAGOVER} solid 5px;
    // border-top: ${COLORS.DRAGOVER} solid 5px;
    background-color: ${COLORS.DRAGOVER};
  }
`;

const LeftLine = styled(Line)`
  top: 0;
  bottom: 0;
  left: 0;
  width: 0.1px;

  .hover-left > & {
    border-left: ${COLORS.DRAGOVER} solid 20px;
  }
`;

const RightLine = styled(Line)`
  top: 0;
  bottom: 0;
  right: 0;
  width: 0.1px;

  .hover-right > & {
    border-left: ${COLORS.DRAGOVER} solid 20px;
  }
`;

const TopLine = styled(Line)`
  top: 0;
  left: 0;
  right: 0;
  height: 0.1px;

  .hover-top > & {
    border-top: ${COLORS.DRAGOVER} solid 20px;
  }
`;

const BottomLine = styled(Line)`
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.1px;

  .hover-bottom > & {
    border-top: ${COLORS.DRAGOVER} solid 20px;
  }
`;

export default SelectionBox;
