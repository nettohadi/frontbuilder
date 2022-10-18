import { getByTestId } from '@cypress/utils';
import { camelCaseToKebabCase } from '@src/utils/helperFunctions';

const editAndAssertUsingJustifyControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  let expectedValue;
  getByTestId('justifyContent-start').click();
  expectedValue = 'start';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  getByTestId('justifyContent-center').click();
  expectedValue = 'center';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  getByTestId('justifyContent-end').click();
  expectedValue = 'end';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );
};

export default editAndAssertUsingJustifyControl;
