import { camelCaseToKebabCase } from '@src/utils/helperFunctions';
import { getByTestId } from '@cypress/utils';

const editAndAssertUsingTextControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  const updatedValue = 'new name';
  getByTestId(`${propKey}-text-input`).type('{selectall}').type(updatedValue);

  cy.get(target)
    .find('[data-testid="element-name"]')
    .should('have.text', updatedValue);
};

export default editAndAssertUsingTextControl;
