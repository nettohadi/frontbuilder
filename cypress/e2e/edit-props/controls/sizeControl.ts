import { camelCaseToKebabCase } from '@src/utils/helperFunctions';
import { getByTestId } from '@cypress/utils';

const editAndAssertUsingSizeControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  let expectedValue;

  // select pixel
  getByTestId(`${propKey}-unit-select`).select('px');
  // type value
  getByTestId(`${propKey}-size-input`).focus().type('{selectall}').type('113');
  expectedValue = '113px';

  //assert
  cy.get(target)
    .should('have.attr', 'style')
    .and('include', `${camelCaseToKebabCase(propKey)}: ${expectedValue}`);

  // type value
  getByTestId(`${propKey}-size-input`).focus().type('{selectall}').type('25');

  // select percent
  getByTestId(`${propKey}-unit-select`).select(1);

  expectedValue = '25%';

  //assert
  cy.get(target)
    .should('have.attr', 'style')
    .and('include', `${camelCaseToKebabCase(propKey)}: ${expectedValue}`);
};

export default editAndAssertUsingSizeControl;
