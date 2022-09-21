export const getRectangle = (el: any) => el[0].getBoundingClientRect();

export const getContainerForTest = (children: any = '') => ({
  id: 'c',
  type: 'Box',
  isFunctionComponent: true,
  props: {
    'data-testid': 'test-container',
    className: 'fr-box droppable',
    style: {
      padding: '5px',
      height: '90vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  children: Array.isArray(children) ? children : [children],
});
