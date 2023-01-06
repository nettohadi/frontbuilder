import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import IconOptionControlFactory from '@components/PropsEditor/controls/base/IconOptionControlFactory';

const VisibilityControl = () => {
  return IconOptionControlFactory([
    {
      icon: <FaRegEye />,
      value: 'visible',
      label: 'Visible',
      dataTestId: 'visibility-visible',
    },
    {
      icon: <FaRegEyeSlash />,
      value: 'hidden',
      label: 'Hidden',
      dataTestId: 'visibility-hidden',
    },
  ]);
};

export default VisibilityControl;
