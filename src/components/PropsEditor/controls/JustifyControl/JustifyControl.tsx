import React from 'react';

import * as G from '@components/PropsEditor/controls/shared';
import { current } from '@src/common/current';
import * as Md from 'react-icons/md';
import { getProp } from '@src/global/element';

const JustifyControl = ({ setProp, name, value, label }: any) => {
  const [align, setAlign] = React.useState(value);

  React.useEffect(() => {
    setAlign(value);
  }, [value]);

  const handleClick = (_value: any) => {
    setProp({ [name]: _value });
    setAlign(_value);
  };
  const flexDirection = getProp(current.getElement(), 'flexDirection');
  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.OptionsContainer>
        <G.Option
          data-testid="justifyContent-start"
          selected={align === 'start'}
          onClick={() => handleClick('start')}
        >
          {flexDirection === 'row' ? (
            <Md.MdAlignHorizontalLeft />
          ) : (
            <Md.MdAlignVerticalTop />
          )}
        </G.Option>
        <G.Option
          data-testid="justifyContent-center"
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {flexDirection === 'row' ? (
            <Md.MdAlignHorizontalCenter />
          ) : (
            <Md.MdAlignVerticalCenter />
          )}
        </G.Option>
        <G.Option
          data-testid="justifyContent-end"
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          {flexDirection === 'row' ? (
            <Md.MdAlignHorizontalRight />
          ) : (
            <Md.MdAlignVerticalBottom />
          )}
        </G.Option>
      </G.OptionsContainer>
    </G.Container>
  );
};

export default JustifyControl;
