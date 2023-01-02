import React from 'react';
import { MdOutlineFormatItalic } from 'react-icons/md';
import { BiFont } from 'react-icons/bi';

import IconOptionControlFactory from '@components/PropsEditor/controls/base/IconOptionControlFactory';

const FontStyleControl = () => {
  return IconOptionControlFactory([
    {
      icon: <BiFont />,
      value: 'normal',
      label: 'Normal',
      dataTestId: 'fontStyle-normal',
    },
    {
      icon: <MdOutlineFormatItalic />,
      value: 'italic',
      label: 'Italic',
      dataTestId: 'fontStyle-italic',
    },
  ]);
};

export default FontStyleControl;
