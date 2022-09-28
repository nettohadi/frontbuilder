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
        <S.OptionIcon
          selected={align === 'start'}
          onClick={() => handleClick('start')}
        >
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalTop />
          ) : (
            <Md.MdAlignHorizontalLeft />
          )}
        </S.OptionIcon>
        <S.OptionIcon
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalCenter />
          ) : (
            <Md.MdAlignHorizontalCenter />
          )}
        </S.OptionIcon>
        <S.OptionIcon
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          {style?.flexDirection === 'row' ? (
            <Md.MdAlignVerticalBottom />
          ) : (
            <Md.MdAlignHorizontalRight />
          )}
        </S.OptionIcon>
      </S.OptionsContainer>
    </S.Container>
  );
};

export default AlignControl;
