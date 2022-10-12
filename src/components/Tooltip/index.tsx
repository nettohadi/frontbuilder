import Tippy from '@tippyjs/react';

const Tooltip = ({
  content,
  children,
  interactive = false,
  visible = undefined,
  theme = 'light-border',
  onClickOutside = () => {},
}: {
  content: any;
  children: any;
  interactive?: boolean;
  visible?: boolean;
  theme?: string;
  onClickOutside?: () => void;
}) => {
  const optionalProps = visible !== undefined ? { visible } : {};
  return (
    <Tippy
      theme={theme}
      content={content}
      interactive={interactive}
      {...optionalProps}
      onClickOutside={onClickOutside}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
