let editingMode = false;

const global = {
  getEditMode: () => {
    return editingMode;
  },
  setEditMode: (value: boolean, setter: string = '') => {
    editingMode = value;
  },
};

export default global;
