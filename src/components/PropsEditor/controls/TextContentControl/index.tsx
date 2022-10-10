import * as G from '../shared';
import React from 'react';

const TextContentControl = ({ setProp, value, label }: any) => {
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (e: any) => {
    setText(e.target.value);
    setProp({ textContent: e.target.value });
  };

  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.InputCol>
        <G.Input type="text" value={text} onChange={handleChange} />
      </G.InputCol>
    </G.Container>
  );
};

export default TextContentControl;
