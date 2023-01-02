import DropDownControlFactory from '@components/PropsEditor/controls/base/DropDownControl';

const FontWeightControl = () => {
  return DropDownControlFactory([
    { value: '200', label: 'Light' },
    { value: '300', label: 'Lighter' },
    { value: '400', label: 'Regular' },
    { value: '700', label: 'Bold' },
    { value: '900', label: 'Bolder' },
  ]);
};

export default FontWeightControl;
