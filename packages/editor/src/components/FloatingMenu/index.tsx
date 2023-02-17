import Tippy from '@tippyjs/react';
import styled from 'styled-components';
import { COLORS } from '@src/global/variables';

const FloatingMenu = ({
  content,
  children,
  visible,
  theme = 'dark',
  animation = 'fade',
  onClickOutside,
  showArrow = false,
  placement = 'top',
  showBorder = true,
}: {
  content: any;
  children?: any;
  visible?: boolean;
  theme?: 'dark' | 'light' | 'light-border';
  animation?: 'fade' | 'scale' | 'shift-away' | 'shift-toward';
  onClickOutside?: () => void;
  showArrow?: boolean;
  showBorder?: boolean;
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
}) => {
  return (
    <TippyContainer showBorder={showBorder} showArrow={showArrow}>
      <Tippy
        content={content}
        visible={visible}
        theme={theme}
        animation={animation}
        interactive={true}
        onClickOutside={onClickOutside}
        arrow={showArrow}
        placement={placement}
      >
        {children}
      </Tippy>
    </TippyContainer>
  );
};

export default FloatingMenu;

const TippyContainer = styled.div<{ showBorder: boolean; showArrow: boolean }>`
  .tippy-box {
    border: ${({ showBorder }) =>
      showBorder ? '1px solid rgba(128, 128, 128, 0.47)' : 'none'};
    background-color: ${COLORS.MENU};
    margin-top: ${({ showArrow }) => (showArrow ? 0 : '-9px')};
    margin-bottom: ${({ showArrow }) => (showArrow ? 0 : '-9px')};
  }

  .tippy-content {
    padding: 0;
  }
`;
