import Tippy from '@tippyjs/react';

const FloatingMenu = ({
  content,
  children,
  visible,
  theme = 'dark',
  onClickOutside,
}: {
  content: any;
  children?: any;
  visible?: boolean;
  theme?: 'dark' | 'light' | 'light-border';
  onClickOutside?: () => void;
}) => {
  return (
    <Tippy
      content={content}
      visible={visible}
      theme={theme}
      interactive={true}
      onClickOutside={onClickOutside}
    >
      {children}
    </Tippy>
  );
};

export default FloatingMenu;
