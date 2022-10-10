import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const Tooltip = ({ content, children }: any) => {
  return (
    <Tippy theme="light" content={content}>
      {children}
    </Tippy>
  );
};

export default Tooltip;
