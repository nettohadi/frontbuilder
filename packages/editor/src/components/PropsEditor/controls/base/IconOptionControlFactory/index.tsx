import React from 'react';
import * as G from '@src/components/PropsEditor/controls/shared';

type optionProps = {
  icon: JSX.Element;
  label: string;
  value: string;
  dataTestId: string;
};
const IconOptionControlFactory = (options: optionProps[]) => {
  console.log({ iconOption: options });
  const IconOptionControl = ({ setProp, name, value, label }: any) => {
    const [selectedValue, setSelectedValue] = React.useState(value);

    React.useEffect(() => {
      setSelectedValue(value);
    }, [value]);

    const handleClick = (_value: any) => {
      setProp({ [name]: _value });
      setSelectedValue(_value);
    };

    return (
      <G.Container>
        <G.LabelCol>
          <label>{label}</label>
        </G.LabelCol>
        <G.OptionsContainer>
          {options.map((option) => {
            return (
              <G.Option
                data-testid={option.dataTestId}
                selected={selectedValue === option.value}
                onClick={() => handleClick(option.value)}
              >
                {option.icon}
              </G.Option>
            );
          })}
        </G.OptionsContainer>
      </G.Container>
    );
  };
  return IconOptionControl;
};

export default IconOptionControlFactory;
