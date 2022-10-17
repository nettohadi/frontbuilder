import Tippy from '@tippyjs/react';

const FloatingMenu = ({
  content,
  children,
  visible,
  theme = 'dark',
  animation = 'fade',
  onClickOutside,
}: {
  content: any;
  children?: any;
  visible?: boolean;
  theme?: 'dark' | 'light' | 'light-border';
  animation?: 'fade' | 'scale' | 'shift-away' | 'shift-toward';
  onClickOutside?: () => void;
}) => {
  return (
    <Tippy
      content={content}
      visible={visible}
      theme={theme}
      animation={animation}
      interactive={true}
      onClickOutside={onClickOutside}
    >
      {children}
    </Tippy>
  );
};

export default FloatingMenu;
