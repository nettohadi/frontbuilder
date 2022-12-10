const colors: {
  [key: string]: string;
} = {
  inputBackground: '#212121',
};

export const getColor = (colorKey: string) => {
  return colors[colorKey] || 'white';
};
