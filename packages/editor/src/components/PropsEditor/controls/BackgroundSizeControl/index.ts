import DropDownControlFactory from '@components/PropsEditor/controls/base/DropDownControl';

const Index = () => {
  return DropDownControlFactory([
    { value: 'cover', label: 'Stretch to fill' },
    { value: 'contain', label: 'Fit inside' },
    { value: 'auto', label: 'Original' },
  ]);
};

export default Index;
