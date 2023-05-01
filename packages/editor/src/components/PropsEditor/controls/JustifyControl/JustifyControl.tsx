import React from 'react';

import * as G from '@src/components/PropsEditor/controls/shared';
import { current } from '@src/common/current';
import { getProp } from '@src/global/element';
import * as Rx from 'react-icons/rx';

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
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxAlignLeft />
          ) : (
            <Rx.RxAlignTop />
          )}
        </G.Option>
        <G.Option
          data-testid="justifyContent-center"
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxAlignCenterHorizontally />
          ) : (
            <Rx.RxAlignCenterVertically />
          )}
        </G.Option>
        <G.Option
          data-testid="justifyContent-end"
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxAlignRight />
          ) : (
            <Rx.RxAlignBottom />
          )}
        </G.Option>
        <G.Option
          data-testid="justifyContent-space-between"
          selected={align === 'space-between'}
          onClick={() => handleClick('space-between')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxSpaceBetweenHorizontally />
          ) : (
            <Rx.RxSpaceBetweenVertically />
          )}
        </G.Option>
        <G.Option
          data-testid="justifyContent-space-evenly"
          selected={align === 'space-evenly'}
          onClick={() => handleClick('space-evenly')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxSpaceEvenlyHorizontally />
          ) : (
            <Rx.RxSpaceEvenlyVertically />
          )}
        </G.Option>
      </G.OptionsContainer>
    </G.Container>
  );
};

export default JustifyControl;
