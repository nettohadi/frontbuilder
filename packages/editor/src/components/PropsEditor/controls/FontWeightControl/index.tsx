import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';

const FontWeightControl = () => {
  return FloatingDropDownControlFactory(
    [
      { value: '300', label: 'Light' },
      { value: '200', label: 'Lighter' },
      { value: '500', label: 'Regular' },
      { value: '700', label: 'Bold' },
      { value: '900', label: 'Bolder' },
    ],
    '100px'
  );
};

export default FontWeightControl;
