import Tippy from '@tippyjs/react';

const Tooltip = ({
  content,
  children,
  interactive = false,
  visible = true,
  theme = 'light-border',
  onClickOutside = () => {},
  placement = 'top',
}: {
  content: any;
  children: any;
  interactive?: boolean;
  visible?: boolean;
  theme?: string;
  onClickOutside?: () => void;
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
  return visible ? (
    <Tippy
      theme={theme}
      content={content}
      interactive={interactive}
      onClickOutside={onClickOutside}
      placement={placement}
    >
      {children}
    </Tippy>
  ) : (
    children
  );
};

export default Tooltip;
