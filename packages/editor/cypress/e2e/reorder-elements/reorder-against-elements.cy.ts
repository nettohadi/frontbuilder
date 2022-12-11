import {
  getContainerForTest,
  interceptPageApi,
  interceptProfilesApi,
} from '@cypress/utils';
import {
  getDropAndNonDropElements,
  registerElements,
} from '@frontbuilder/renderer';
import withEditHandler from '@src/pages/Editor/withEditHandler';

describe('Reorder against droppable elements', () => {
  registerElements(withEditHandler);
  const { droppableElements, allElements } = getDropAndNonDropElements();

  droppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can put ${child.type} before ${element.type}`, () => {
        element['data-testid'] = 'droppable-element';
        child['data-testid'] = 'element-to-reorder';

        interceptPageApi(getContainerForTest([element, child]));
        interceptProfilesApi();
        cy.visit('/1/2');

        const source = `[data-testid="${child['data-testid']}"]`;
        const target = `[data-testid="${element['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        putSourceBeforeTarget(source, target);

        verifyElementsOrder(
          'element-to-reorder',
          'droppable-element',
          testContainer
        );
      });

      it(`can put ${child.type} after ${element.type}`, () => {
        element['data-testid'] = 'droppable-element';
        child['data-testid'] = 'element-to-reorder';

        interceptPageApi(getContainerForTest([element, child]));
        interceptProfilesApi();
        cy.visit('/1/2');

        const source = `[data-testid="${child['data-testid']}"]`;
        const target = `[data-testid="${element['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        putSourceAfterTarget(source, target);

        verifyElementsOrder(
          'droppable-element',
          'element-to-reorder',
          testContainer
        );
      });
    });
  });
});

describe('Reorder against non droppable elements', () => {
  const { nonDroppableElements, allElements } = getDropAndNonDropElements();

  nonDroppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can put ${child.type} before ${element.type}`, () => {
        element['data-testid'] = 'non-droppable-element';
        child['data-testid'] = 'element-to-reorder';

        interceptPageApi(getContainerForTest([element, child]));
        interceptProfilesApi();
        cy.visit('/1/2');

        const source = `[data-testid="${child['data-testid']}"]`;
        const target = `[data-testid="${element['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        putSourceBeforeTarget(source, target);

        verifyElementsOrder(
          'element-to-reorder',
          'non-droppable-element',
          testContainer
        );
      });

      it(`can put ${child.type} after ${element.type}`, () => {
        element['data-testid'] = 'non-droppable-element';
        child['data-testid'] = 'element-to-reorder';

        interceptPageApi(getContainerForTest([element, child]));
        interceptProfilesApi();
        cy.visit('/1/2');

        const source = `[data-testid="${child['data-testid']}"]`;
        const target = `[data-testid="${element['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        putSourceAfterTarget(source, target);

        verifyElementsOrder(
          'non-droppable-element',
          'element-to-reorder',
          testContainer
        );
      });
    });
  });
});

const putSourceBeforeTarget = (
  sourceTestId: string,
  targetTestId: string
): any => {
  const dataTransfer = new DataTransfer();
  cy.get(sourceTestId).trigger('dragstart', { dataTransfer, force: true });

  cy.get(targetTestId)
    .trigger('dragenter', { dataTransfer, force: true })
    .trigger('dragover', 'left', { dataTransfer, force: true });

  cy.get(sourceTestId).trigger('dragend', { force: true });
};

const putSourceAfterTarget = (
  sourceTestId: string,
  targetTestId: string
): any => {
  const dataTransfer = new DataTransfer();
  cy.get(sourceTestId).trigger('dragstart', { dataTransfer, force: true });

  cy.get(targetTestId)
    .trigger('dragenter', { dataTransfer, force: true })
    .trigger('dragover', 'right', { dataTransfer, force: true });

  cy.get(sourceTestId).trigger('dragend', { force: true });
};

const verifyElementsOrder = (
  firstElementTestId: string,
  secondElementTestId: string,
  containerTestId: string
) => {
  cy.wait(1000);
  // verify elements order
  cy.get(`[data-testid="${firstElementTestId}"]`).should('be.visible');
  cy.get(`[data-testid="${secondElementTestId}"]`)
    .should('be.visible')
    .should('be.visible');

  cy.get(containerTestId).children().should('have.length', 2);

  cy.get(containerTestId)
    .children()
    .eq(0)
    .children()
    .should('have.attr', 'data-testid', firstElementTestId);

  cy.get(containerTestId)
    .children()
    .eq(1)
    .children()
    .should('have.attr', 'data-testid', secondElementTestId);
};
