import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import * as S from './styles';
import FloatingMenu from '@components/FloatingMenu';
import * as G from '@components/PropsEditor/controls/shared';

type optionsProp = { value: string; label: string | JSX.Element }[];

const FloatingDropDownControlFactory = (
  options: optionsProp,
  width: string = '100%'
) => {
  const FloatingDropDownControl = ({ setProp, name, value, label }: any) => {
    const [selected, setSelected] = useState(value);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setSelected(value);
    }, [value, setProp]);

    const handleClick = (value: string) => {
      setSelected(value);
      setProp({ [name]: value });
      setIsVisible(false);
    };

    return (
      <G.Container>
        <G.LabelCol>
          <label>{label}</label>
        </G.LabelCol>
        <G.InputCol>
          <FloatingMenu
            content={
              <List width={width} options={options} onClick={handleClick} />
            }
            visible={isVisible}
            onClickOutside={() => setIsVisible(false)}
            placement={'bottom-start'}
          >
            <S.Wrapper width={width} onClick={() => setIsVisible((s) => !s)}>
              {options.find((o) => o.value === selected)?.label}
              <MdOutlineKeyboardArrowDown size={18} cursor={'pointer'} />
            </S.Wrapper>
          </FloatingMenu>
        </G.InputCol>
      </G.Container>
    );
  };

  return FloatingDropDownControl;
};

export default FloatingDropDownControlFactory;

const List = ({
  options,
  onClick,
  width,
}: {
  options: optionsProp;
  onClick: (value: string) => void;
  width: string;
}) => {
  return (
    <S.ListWrapper width={width}>
      {options?.map((option, index) => {
        return (
          <S.MenuItem key={index} onClick={() => onClick(option.value)}>
            {option.label}
          </S.MenuItem>
        );
      })}
    </S.ListWrapper>
  );
};
