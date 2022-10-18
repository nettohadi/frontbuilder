import { camelCaseToKebabCase } from '@src/utils/helperFunctions';
import { getByTestId } from '@cypress/utils';

const editAndAssertUsingSpacingControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  let expectedValue;

  if (!getByTestId(`${propKey}-equal`)) {
    getByTestId(`${propKey}-equal`).click();
  }

  const leftValue = getByTestId(`${propKey}-left`).invoke('val');
  console.log({ leftValue });

  getByTestId(`${propKey}-right`).focus().type('{selectall}').type('10');
  expectedValue = '10px';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );

  //turn off equal button
  if (getByTestId(`${propKey}-equal`)) {
    getByTestId(`${propKey}-equal`).click();
  }

  getByTestId(`${propKey}-top`).focus().type('{selectall}').type('15');
  getByTestId(`${propKey}-right`).focus().type('{selectall}').type('20');
  getByTestId(`${propKey}-bottom`).focus().type('{selectall}').type('25');
  getByTestId(`${propKey}-left`).focus().type('{selectall}').type('10');
  expectedValue = '15px 20px 25px 10px';

  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    expectedValue
  );
};

export default editAndAssertUsingSpacingControl;
