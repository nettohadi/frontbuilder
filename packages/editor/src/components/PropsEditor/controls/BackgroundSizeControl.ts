import DropDownControlFactory from '@components/PropsEditor/controls/DropDownControl';

const BackgroundSizeControl = () => {
  return DropDownControlFactory([
    { value: 'cover', label: 'Stretch to fill' },
    { value: 'contain', label: 'Fit inside' },
    { value: 'auto', label: 'Original' },
  ]);
};

export default BackgroundSizeControl;
