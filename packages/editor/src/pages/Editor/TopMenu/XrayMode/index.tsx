import { MdGridOn } from 'react-icons/md';
import styled from 'styled-components';
import { current } from '@src/common/current';
import { COLORS } from '@src/global/variables';
import { useEditor } from '@src/hooks/useEditor';
import Tooltip from '@components/Tooltip';

const XrayMode = () => {
  const renderEditor = useEditor();
  const toggleXrayMode = () => {
    current.xrayMode = !current.xrayMode;
    renderEditor();
  };
  return (
    <Tooltip
      content={
        current.xrayMode
          ? 'Click to disable xray mode'
          : 'Click to enable xray mode'
      }
    >
      <XrayModeWrapper selected={current.xrayMode} onClick={toggleXrayMode}>
        <MdGridOn size={22} />
      </XrayModeWrapper>
    </Tooltip>
  );
};

export default XrayMode;

const XrayModeWrapper = styled.div<{ selected: boolean }>`
  color: white;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  background-color: ${({ selected }) =>
    selected ? COLORS.INPUT_BACKGROUND : 'transparent'};

  &:hover {
    opacity: 1;
  }
`;
