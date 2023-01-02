import React from 'react';
import IconOptionControlFactory from '@components/PropsEditor/controls/base/IconOptionControlFactory';

const HeadingTypeControl = () => {
  const Heading = ({ type }: { type: string }) => {
    return <div style={{ fontSize: 12 }}>{type}</div>;
  };

  return IconOptionControlFactory([
    {
      icon: <Heading type="h1" />,
      value: 'h1',
      label: 'Heading 1',
      dataTestId: 'headingType-h1',
    },
    {
      icon: <Heading type="h2" />,
      value: 'h2',
      label: 'Heading 2',
      dataTestId: 'headingType-h2',
    },
    {
      icon: <Heading type="h3" />,
      value: 'h3',
      label: 'Heading 3',
      dataTestId: 'headingType-h3',
    },
    {
      icon: <Heading type="h4" />,
      value: 'h4',
      label: 'Heading 4',
      dataTestId: 'headingType-h4',
    },
    {
      icon: <Heading type="h5" />,
      value: 'h5',
      label: 'Heading 5',
      dataTestId: 'headingType-h5',
    },
    {
      icon: <Heading type="h6" />,
      value: 'h6',
      label: 'Heading 6',
      dataTestId: 'headingType-h6',
    },
  ]);
};

export default HeadingTypeControl;
