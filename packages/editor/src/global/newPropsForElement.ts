const newPropsForElement: any = {
  Box: {
    backgroundBlendMode: 'normal',
    backgroundImage: '',
    backgroundSize: 'contain',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
  },
};
const getNewPropsForElement = (elementType: string) => {
  return newPropsForElement[elementType] || {};
};

export default getNewPropsForElement;
