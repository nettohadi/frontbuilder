import React from 'react';
import { MdOutlineFormatUnderlined } from 'react-icons/md';
import { BiFont } from 'react-icons/bi';
import { TbOverline } from 'react-icons/tb';
import { RxStrikethrough } from 'react-icons/rx';

import IconOptionControlFactory from '@components/PropsEditor/controls/base/IconOptionControlFactory';

const TextDecorationControl = () => {
  return IconOptionControlFactory([
    {
      icon: <BiFont />,
      value: 'none',
      label: 'Auto',
      dataTestId: 'textCase-auto',
    },
    {
      icon: <TbOverline />,
      value: 'overline',
      label: 'Overline',
      dataTestId: 'textDecoration-overline',
    },
    {
      icon: <RxStrikethrough size={16} />,
      value: 'line-through',
      label: 'Line Through',
      dataTestId: 'textDecoration-line-through',
    },
    {
      icon: <MdOutlineFormatUnderlined />,
      value: 'underline',
      label: 'Underline',
      dataTestId: 'textCase-underline',
    },
  ]);
};

export default TextDecorationControl;
