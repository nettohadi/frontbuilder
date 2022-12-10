import { camelCaseToKebabCase } from '../../../../src/utils/helperFunctions';
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
  getByTestId(`${propKey}-size-input`)
    .focus()
    .type('{selectall}')
    .type('113')
    .type('{enter}');
  expectedValue = '113px';

  //assert
  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  // type value
  getByTestId(`${propKey}-size-input`)
    .focus()
    .type('{selectall}')
    .type('60')
    .blur();

  // select percent
  getByTestId(`${propKey}-unit-select`).select(0);

  expectedValue = '60px';

  //assert
  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );
};

export default editAndAssertUsingSizeControl;
