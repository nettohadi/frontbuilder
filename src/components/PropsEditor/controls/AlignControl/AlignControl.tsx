import React from 'react';
import * as S from '@components/PropsEditor/controls/shared';
import * as Md from 'react-icons/md';
import { current } from '@src/common/current';

const AlignControl = ({ setStyle, name, value, label }: any) => {
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
            <Md.MdAlignVerticalTop />
          ) : (
            <Md.MdAlignHorizontalLeft />
          )}
        </S.Option>
        <S.Option
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalCenter />
          ) : (
            <Md.MdAlignHorizontalCenter />
          )}
        </S.Option>
        <S.Option selected={align === 'end'} onClick={() => handleClick('end')}>
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalBottom />
          ) : (
            <Md.MdAlignHorizontalRight />
          )}
        </S.Option>
      </S.OptionsContainer>
    </S.Container>
  );
};

export default AlignControl;
