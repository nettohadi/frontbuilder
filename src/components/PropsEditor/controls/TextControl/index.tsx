import debounce from 'lodash.debounce';

const TextControl = ({ setStyle, name, value, label }: any) => {
  const handleChange = (e: any) => {
    setStyle({ [name]: e.target.value });
  };

  const debouncedHandleChange = debounce(handleChange, 500);
  return (
    <div>
      <div>{label}</div>
      <input
        type="text"
        defaultValue={value}
        onChange={debouncedHandleChange}
      />
    </div>
  );
};

export default TextControl;
