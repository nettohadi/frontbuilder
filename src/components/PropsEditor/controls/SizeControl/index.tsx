import debounce from 'lodash.debounce';

const SizeControl = ({ setStyle, name, value, label }: any) => {
  console.log({ value });
  const handleChange = (e: any) => {
    setStyle({ [name]: e.target.value + 'px' });
  };

  const debouncedHandleChange = debounce(handleChange, 500);
  return (
    <div>
      <div>{label}</div>
      <input
        type="number"
        defaultValue={String(value).replace('px', '')}
        onChange={debouncedHandleChange}
      />
      <span>px</span>
    </div>
  );
};

export default SizeControl;
