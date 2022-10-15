export const getRectangle = (el: any) => el[0].getBoundingClientRect();

export const getContainerForTest = (children: any = '') => ({
  id: 'c',
  type: 'Box',
  isFunctionComponent: true,
  'data-testid': 'test-container',
  className: 'fr-box droppable',
  props: {
    padding: '5px',
    height: '90vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: Array.isArray(children) ? children : [children],
});

export const reloadPage = () => {
  cy.wait(700);
  cy.reload();
};
