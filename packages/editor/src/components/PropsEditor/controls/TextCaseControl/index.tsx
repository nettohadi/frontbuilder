import React from 'react';
import {
  RxLetterCaseUppercase,
  RxLetterCaseCapitalize,
  RxLetterCaseLowercase,
  RxLetterCaseToggle,
} from 'react-icons/rx';

import IconOptionControlFactory from '@components/PropsEditor/controls/base/IconOptionControlFactory';

const TextCaseControl = () => {
  return IconOptionControlFactory([
    {
      icon: <RxLetterCaseToggle />,
      value: 'none',
      label: 'Auto',
      dataTestId: 'textCase-auto',
    },
    {
      icon: <RxLetterCaseUppercase />,
      value: 'uppercase',
      label: 'Uppercase',
      dataTestId: 'textCase-uppercase',
    },
    {
      icon: <RxLetterCaseCapitalize />,
      value: 'capitalize',
      label: 'Capitalize',
      dataTestId: 'textCase-capitalize',
    },
    {
      icon: <RxLetterCaseLowercase />,
      value: 'lowercase',
      label: 'Lowercase',
      dataTestId: 'textCase-lowercase',
    },
  ]);
};

export default TextCaseControl;
