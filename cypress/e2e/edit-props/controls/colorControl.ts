import { camelCaseToKebabCase } from '@src/utils/helperFunctions';
import { getByTestId } from '@cypress/utils';

const editAndAssertUsingColorControl = (target: string, propKey: string) => {
  let expectedValue;

  getByTestId(`${propKey}-color-input`)
    .focus()
    .type('{selectall}')
    .type('rgb(47, 231, 45)');
  expectedValue = 'rgb(47, 231, 45)';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  getByTestId(`${propKey}-color-input`)
    .focus()
    .type('{selectall}')
    .type('rgb(24, 31, 139)');
  expectedValue = 'rgb(24, 31, 139)';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );
  // make sure the color picker is not visible when not clicked
  getByTestId(`color-picker`).should('not.exist');

  getByTestId(`${propKey}-color-button`).click();
  // make sure the color picker is not visible when clicked
  getByTestId(`color-picker`).should('exist');
};

export default editAndAssertUsingColorControl;
