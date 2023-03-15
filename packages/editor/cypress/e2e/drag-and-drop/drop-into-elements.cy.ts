import {
  getContainerForTest,
  interceptPageApi,
  interceptProfilesApi,
} from '@cypress/utils';
import {
  getDropAndNonDropElements,
  registerElements,
} from '@frontbuilder/renderer';
import { generateElementTestId } from '@src/utils/tests';
import withEditHandler from '@src/pages/Editor/withEditHandler';

describe('Drop into droppable elements', () => {
  registerElements(withEditHandler);
  const { droppableElements, allElements } = getDropAndNonDropElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
  });

  droppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can drag and drop ${child.type} into ${element.type}`, () => {
        element['data-testid'] = 'droppable-element';

        interceptPageApi(getContainerForTest(element));
        interceptProfilesApi();

        cy.visit('/1/2');

        const source = generateElementTestId(child, true);
        const target = `[data-testid="${element['data-testid']}"]`;

        dragAndDrop(source, target);

        verifyElementExistAsChildren(target, `fr-${child.type.toLowerCase()}`);
      });
    });
  });
});

describe('Drop into non droppable elements', () => {
  const { nonDroppableElements, allElements } = getDropAndNonDropElements();
  beforeEach(() => {
    cy.viewport(1447, 844);
  });

  nonDroppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can drag and drop ${child.type} into ${element.type}`, () => {
        element['data-testid'] = 'non-droppable-element';
        if (element.type === 'Image')
          element.props.src = 'https://test.com/dummy';

        interceptPageApi(getContainerForTest(element));
        interceptProfilesApi();

        cy.visit('/1/2');

        const source = generateElementTestId(child, true);
        const target = `[data-testid="${element['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        dragAndDrop(source, target);

        cy.get(target).children().should('have.length', 0);

        verifyElementExistAsChildren(
          testContainer,
          `fr-${child.type.toLowerCase()}`,
          2
        );
      });
    });
  });
});

const dragAndDrop = (sourceTestId: string, targetTestId: string): any => {
  const dataTransfer = new DataTransfer();
  cy.get(sourceTestId).trigger('dragstart', { dataTransfer });

  cy.get(targetTestId)
    .trigger('dragenter', { dataTransfer })
    .trigger('dragover', { dataTransfer });

  cy.get(sourceTestId).trigger('dragend');
};

const verifyElementExistAsChildren = (
  targetTestId: string,
  childClass: string,
  childCount: number = 1
) => {
  cy.get(targetTestId).children().should('have.length', childCount);
  cy.get(targetTestId).children().should('have.class', childClass);
};
