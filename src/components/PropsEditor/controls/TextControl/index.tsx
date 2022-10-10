import debounce from 'lodash.debounce';
import * as G from '../shared';

const TextControl = ({ setProp, name, value, label }: any) => {
  const handleChange = (e: any) => {
    setProp({ [name]: e.target.value });
  };

  const debouncedHandleChange = debounce(handleChange, 500);
  return (
    <G.Container>
      <G.LabelCol>
        <label>{label}</label>
      </G.LabelCol>
      <G.InputCol>
        <G.Input
          type="text"
          defaultValue={value}
          onChange={debouncedHandleChange}
        />
      </G.InputCol>
    </G.Container>
  );
};

export default TextControl;
