import React from 'react';
import * as G from '@src/components/PropsEditor/controls/shared';
import * as Rx from 'react-icons/rx';
import { current } from '@src/common/current';
import { getProp } from '@src/global/element';

const AlignControl = ({ setProp, name, value, label }: any) => {
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
          data-testid="alignItems-start"
          selected={align === 'start'}
          onClick={() => handleClick('start')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxAlignTop />
          ) : (
            <Rx.RxAlignLeft />
          )}
        </G.Option>
        <G.Option
          data-testid="alignItems-center"
          selected={align === 'center'}
          onClick={() => handleClick('center')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxAlignCenterVertically />
          ) : (
            <Rx.RxAlignCenterHorizontally />
          )}
        </G.Option>
        <G.Option
          data-testid="alignItems-end"
          selected={align === 'end'}
          onClick={() => handleClick('end')}
        >
          {flexDirection === 'row' || flexDirection === 'row-reverse' ? (
            <Rx.RxAlignBottom />
          ) : (
            <Rx.RxAlignRight />
          )}
        </G.Option>
      </G.OptionsContainer>
    </G.Container>
  );
};

export default AlignControl;
