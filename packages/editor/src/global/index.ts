type modeType = 'edit' | 'preview' | 'test';
let mode: modeType = 'edit';

const global = {
  getMode: (): modeType => {
    return mode;
  },
  setMode: (value: modeType, setter: string = '') => {
    if (setter !== '') console.log(setter);
    mode = value;
  },
  get isEditMode() {
    return mode === 'edit';
  },
};

export default global;
