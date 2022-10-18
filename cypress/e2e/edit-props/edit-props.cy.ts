import data from '@src/data';
import { getAllRegisteredElements } from '@src/utils';
import { getByTestId, getContainerForTest, reloadPage } from '@cypress/utils';
import getControlForProp from '@components/PropsEditor/controls';
import ColorControl from '@components/PropsEditor/controls/ColorControl';
import FlexDirectionControl from '@components/PropsEditor/controls/FlexDirectionControl';
import AlignControl from '@components/PropsEditor/controls/AlignControl/AlignControl';
import JustifyControl from '@components/PropsEditor/controls/JustifyControl/JustifyControl';
import TextControl from '@components/PropsEditor/controls/TextControl';
import SizeControl from '@components/PropsEditor/controls/SizeControl';
import SpacingControl from '@components/PropsEditor/controls/SpacingControl';
import { generateElementTestId, generateHandlerTestId } from '@src/utils/tests';
import {
  camelCaseToKebabCase,
  getOnlyCssProps,
} from '@src/utils/helperFunctions';

describe('Edit props', () => {
  const elements = getAllRegisteredElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
    cy.visit('/editor');
  });

  Object.keys(elements).forEach((key, index) => {
    const element = elements[key].data;
    const { props } = element;
    element['data-testid'] = `props-${element.type}`;
    const editHandler = generateHandlerTestId(element, true);

    const cssProps = getOnlyCssProps(props);
    cssProps.forEach((propKey) => {
      it(`can edit ${propKey} for ${key}`, () => {
        const target = wrapperProps.includes(propKey)
          ? editHandler
          : `[data-testid="${element['data-testid']}"]`;

        data.set(getContainerForTest(element));
        cy.get(target).click();

        const { control } = getControlForProp(propKey);
        const previousValue = props[propKey];

        switch (control) {
          case ColorControl:
            editAndAssertUsingColorControl(target, propKey, previousValue);
            break;
          case SizeControl:
            editAndAssertUsingSizeControl(target, propKey, previousValue);
            break;
          case TextControl:
            editAndAssertUsingTextControl(target, propKey, previousValue);
            break;
          case JustifyControl:
            editAndAssertUsingJustifyControl(target, propKey, previousValue);
            break;
          case AlignControl:
            editAndAssertUsingAlignControl(target, propKey, previousValue);
            break;
          case FlexDirectionControl:
            editAndAssertUsingFlexDirectionControl(
              target,
              propKey,
              previousValue
            );
            break;
          case SpacingControl:
            editAndAssertUsingSpacingControl(target, propKey, previousValue);
            break;

          default:
            // updatedValue = previousValue;
            break;
        }
      });
    });
  });
});

const editAndAssertUsingColorControl = (
  target: string,
  propKey: string,
  prevValue: string
): string => {
  const updatedValue = prevValue;
  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    updatedValue
  );

  return prevValue;
};
const editAndAssertUsingSizeControl = (
  target: string,
  propKey: string,
  prevValue: string
): string => {
  const updatedValue = prevValue;
  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    updatedValue
  );

  return prevValue;
};
const editAndAssertUsingTextControl = (
  target: string,
  propKey: string,
  prevValue: string
): string => {
  const updatedValue = prevValue;
  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    updatedValue
  );

  return prevValue;
};
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
const editAndAssertUsingSpacingControl = (
  target: string,
  propKey: string,
  prevValue: string
) => {
  const updatedValue = prevValue;
  cy.get(target).should(
    'have.css',
    camelCaseToKebabCase(propKey),
    updatedValue
  );

  return prevValue;
};

const wrapperProps = ['height', 'width', 'margin'];
