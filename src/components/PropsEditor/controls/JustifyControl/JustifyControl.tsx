import React from 'react';

import * as G from '@components/PropsEditor/controls/shared';
import { current } from '@src/common/current';
import * as Md from 'react-icons/md';

const JustifyControl = ({ setProp, name, value, label }: any) => {
  console.log('renders horizontal alignment control');
  const [align, setAlign] = React.useState(value);

  React.useEffect(() => {
    setAlign(value);
  }, [value]);

  const handleClick = (_value: any) => {
    setProp({ [name]: _value });
    setAlign(_value);
  };
  const { props } = current.getElement() || { flexDirection: 'row' };
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
          {props?.flexDirection === 'row' ? (
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
          {props?.flexDirection === 'row' ? (
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
          {props?.flexDirection === 'row' ? (
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
