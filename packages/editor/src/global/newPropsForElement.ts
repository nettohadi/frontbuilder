const newPropsForElement: any = {
  Box: {
    backgroundBlendMode: 'normal',
    backgroundImage: '',
    backgroundSize: 'contain',
    backgroundPosition: 'left',
    backgroundRepeat: 'no-repeat',
    borderColor: 'rgb(255 255 255 / 0)',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: '0px',
  },
  Heading: {
    fontSize: 'inherit',
  },
  Button: {
    borderColor: 'rgb(128, 128, 128)',
    borderWidth: 1,
    borderStyle: 'solid',
  },
};
const getNewPropsForElement = (elementType: string) => {
  return newPropsForElement[elementType] || {};
};

export default getNewPropsForElement;
