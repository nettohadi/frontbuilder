import * as S from '@components/PropsEditor/controls/shared';
import React from 'react';
import { current } from '@src/common/current';
import * as Md from 'react-icons/md';

const JustifyControl = ({ setStyle, name, value, label }: any) => {
  console.log('renders horizontal alignment control');
  const [align, setAlign] = React.useState(value);

  React.useEffect(() => {
    setAlign(value);
  }, [value]);

  const handleClick = (_value: any) => {
    setStyle({ [name]: _value });
    setAlign(_value);
  };
  const { style } = current.getElement()?.props || { flexDirection: 'row' };
  return (
    <S.Container>
      <label>{label}</label>
      <S.OptionsContainer>
        <S.Option
          selected={align === 'start'}
          onClick={() => handleClick('start')}
        >
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignHorizontalLeft />
          ) : (
            <Md.MdAlignVerticalTop />
          )}
        </S.Option>
        <S.Option
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignHorizontalCenter />
          ) : (
            <Md.MdAlignVerticalCenter />
          )}
        </S.Option>
        <S.Option selected={align === 'end'} onClick={() => handleClick('end')}>
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignHorizontalRight />
          ) : (
            <Md.MdAlignVerticalBottom />
          )}
        </S.Option>
      </S.OptionsContainer>
    </S.Container>
  );
};

export default JustifyControl;
