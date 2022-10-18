import { getByTestId } from '@cypress/utils';
import { camelCaseToKebabCase } from '@src/utils/helperFunctions';

const editAndAssertUsingFlexDirectionControl = (
  target: string,
  propKey: string,
  prevValue: string
): string => {
  let expectedValue;
  getByTestId('flexDirection-row').click();
  expectedValue = 'row';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  getByTestId('flexDirection-column').click();
  expectedValue = 'column';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  return prevValue;
};

export default editAndAssertUsingFlexDirectionControl;
