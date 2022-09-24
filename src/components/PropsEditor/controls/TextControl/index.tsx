import debounce from 'lodash.debounce';
import * as S from '../shared';

const TextControl = ({ setStyle, name, value, label }: any) => {
  const handleChange = (e: any) => {
    setStyle({ [name]: e.target.value });
  };

  const debouncedHandleChange = debounce(handleChange, 500);
  return (
    <div>
      <div>{label}</div>
      <S.Input
        type="text"
        defaultValue={value}
        onChange={debouncedHandleChange}
      />
    </div>
  );
};

export default TextControl;
