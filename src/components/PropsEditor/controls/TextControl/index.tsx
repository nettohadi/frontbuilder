import React from 'react';
import * as G from '../shared';

const TextControl = ({ setProp, name, value, label }: any) => {
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (e: any) => {
    setText(e.target.value);
    setProp({ name: e.target.value });
  };

  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.InputCol>
        <G.Input
          data-testid={`${name}-text-input`}
          type="text"
          value={text}
          onChange={handleChange}
        />
      </G.InputCol>
    </G.Container>
  );
};

export default TextControl;
