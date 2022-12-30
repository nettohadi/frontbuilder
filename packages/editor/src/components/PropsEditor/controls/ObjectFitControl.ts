import DropDownControlFactory from '@components/PropsEditor/controls/DropDownControl';

const ObjectFitControl = () => {
  return DropDownControlFactory([
    { value: 'cover', label: 'Stretch to fill' },
    { value: 'contain', label: 'Fit inside' },
    { value: 'fill', label: 'Fill' },
    { value: 'none', label: 'Original' },
  ]);
};

export default ObjectFitControl;
