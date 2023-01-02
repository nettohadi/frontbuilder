import * as G from '@components/PropsEditor/controls/shared';
import React, { useEffect } from 'react';

const DropDownControlFactory = (
  options: { value: string; label: string }[]
) => {
  const DropDownControl = ({ setProp, name, value, label }: any) => {
    const [selected, setSelected] = React.useState(value);

    useEffect(() => {
      setSelected(value);
    }, [value]);

    const handleChange = (e: any) => {
      setSelected(e.target.value);
      setProp({ [name]: e.target.value });
    };
    return (
      <G.Container>
        <G.LabelCol>
          <label>{label}</label>
        </G.LabelCol>
        <G.InputCol>
          <G.Select onChange={handleChange} value={selected}>
            {options.map((option, index) => (
              <option value={option.value} key={`${index}-${selected}`}>
                {option.label}
              </option>
            ))}
          </G.Select>
        </G.InputCol>
      </G.Container>
    );
  };

  return DropDownControl;
};

export default DropDownControlFactory;
