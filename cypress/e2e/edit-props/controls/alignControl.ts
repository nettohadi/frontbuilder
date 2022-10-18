import { getByTestId } from '@cypress/utils';
import { camelCaseToKebabCase } from '@src/utils/helperFunctions';

const editAndAssertUsingAlignControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  let expectedValue;
  getByTestId('alignItems-start').click();
  expectedValue = 'start';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  getByTestId('alignItems-center').click();
  expectedValue = 'center';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  getByTestId('alignItems-end').click();
  expectedValue = 'end';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );
};

export default editAndAssertUsingAlignControl;
