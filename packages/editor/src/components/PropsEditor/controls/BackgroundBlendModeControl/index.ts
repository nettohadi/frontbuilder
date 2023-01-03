import DropDownControlFactory from '@components/PropsEditor/controls/base/DropDownControl';

const BackgroundBlendModeControl = () => {
  return DropDownControlFactory([
    { value: 'normal', label: 'Normal' },
    { value: 'color', label: 'Color' },
    { value: 'color-dodge', label: 'Color Dodge' },
    { value: 'darken', label: 'Darken' },
    { value: 'difference', label: 'Difference' },
    { value: 'exclusion', label: 'Exclusion' },
    { value: 'hard-light', label: 'Hard Light' },
    { value: 'hue', label: 'Hue' },
    { value: 'lighten', label: 'Lighten' },
    { value: 'luminosity', label: 'Luminosity' },
    { value: 'multiply', label: 'Multiply' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'saturation', label: 'Saturation' },
    { value: 'screen', label: 'Screen' },
    { value: 'soft-light', label: 'Soft Light' },
  ]);
};

export default BackgroundBlendModeControl;
