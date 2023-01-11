import FloatingDropDownControlFactory from '@components/PropsEditor/controls/base/FloatingDropDownControl';

const Index = () => {
  return FloatingDropDownControlFactory(
    [
      { value: 'cover', label: 'Stretch to fill' },
      { value: 'contain', label: 'Fit inside' },
      { value: 'auto', label: 'Original' },
    ],
    '115px'
  );
};

export default Index;
