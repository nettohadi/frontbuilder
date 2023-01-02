import React from 'react';
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignRight,
} from 'react-icons/fa';

import IconOptionControlFactory from '@components/PropsEditor/controls/base/IconOptionControlFactory';

const TextAlignmentControl = () => {
  return IconOptionControlFactory([
    {
      icon: <FaAlignLeft />,
      value: 'left',
      label: 'Left',
      dataTestId: 'textAlign-left',
    },
    {
      icon: <FaAlignCenter />,
      value: 'center',
      label: 'Center',
      dataTestId: 'textAlign-center',
    },
    {
      icon: <FaAlignJustify />,
      value: 'justify',
      label: 'Justify',
      dataTestId: 'textAlign-justify',
    },
    {
      icon: <FaAlignRight />,
      value: 'right',
      label: 'Right',
      dataTestId: 'textAlign-right',
    },
  ]);
};

export default TextAlignmentControl;
