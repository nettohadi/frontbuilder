import { getByTestId } from '@cypress/utils';

const editAndAssertUsingVideoControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  const updatedValue = 'https://sample-video.com';
  getByTestId(`${propKey}-text-input`).type('{selectall}').type(updatedValue);

  cy.get(target).find('source').should('have.attr', 'src', updatedValue);
};

export default editAndAssertUsingVideoControl;
