import { getByTestId } from '@cypress/utils';

const editAndAssertUsingTextContentControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  const updatedValue = 'new content';
  getByTestId(`${propKey}-text-content-input`)
    .type('{selectall}')
    .type(updatedValue);

  cy.get(target).should('have.text', updatedValue);
};

export default editAndAssertUsingTextContentControl;
