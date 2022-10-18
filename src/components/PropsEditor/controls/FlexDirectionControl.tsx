import React from 'react';
import * as G from '@components/PropsEditor/controls/shared';
import { MdTableRows, MdViewColumn } from 'react-icons/md';

const FlexDirectionControl = ({ setProp, name, value, label }: any) => {
  const [direction, setDirection] = React.useState(value);

  React.useEffect(() => {
    setDirection(value);
  }, [value]);

  const handleClick = (_value: any) => {
    setProp({ [name]: _value }, true);
    setDirection(_value);
  };
  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>

      <G.OptionsContainer>
        <G.Option
          data-testid="flexDirection-row"
          selected={direction === 'row'}
          onClick={() => handleClick('row')}
        >
          <MdViewColumn />
        </G.Option>
        <G.Option
          data-testid="flexDirection-column"
          selected={direction === 'column'}
          onClick={() => handleClick('column')}
        >
          <MdTableRows />
        </G.Option>
      </G.OptionsContainer>
    </G.Container>
  );
};

export default FlexDirectionControl;
