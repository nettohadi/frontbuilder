import DropDownControlFactory from '@components/PropsEditor/controls/base/DropDownControl';

const BorderStyleControl = () => {
  return DropDownControlFactory([
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
    { value: 'ridge', label: 'Ridge' },
    { value: 'groove', label: 'Groove' },
    { value: 'inset', label: 'Inset' },
    { value: 'double', label: 'Double' },
  ]);
};

export default BorderStyleControl;
