import React from 'react';
import * as G from '@components/PropsEditor/controls/shared';
import * as Md from 'react-icons/md';
import { current } from '@src/common/current';

const AlignControl = ({ setProp, name, value, label }: any) => {
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
          data-testid="alignItems-start"
          selected={align === 'start'}
          onClick={() => handleClick('start')}
        >
          {props?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalTop />
          ) : (
            <Md.MdAlignHorizontalLeft />
          )}
        </G.Option>
        <G.Option
          data-testid="alignItems-center"
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {props?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalCenter />
          ) : (
            <Md.MdAlignHorizontalCenter />
          )}
        </G.Option>
        <G.Option
          data-testid="alignItems-end"
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          {props?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalBottom />
          ) : (
            <Md.MdAlignHorizontalRight />
          )}
        </G.Option>
      </G.OptionsContainer>
    </G.Container>
  );
};

export default AlignControl;
