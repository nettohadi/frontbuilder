export const getRectangle = (el: any) => el[0].getBoundingClientRect();

export const getContainerForTest = (children) => ({
  id: 'c',
  type: 'div',
  props: {
    className: '',
    style: {
      padding: '5px',
      height: '90vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  children: [children],
});
