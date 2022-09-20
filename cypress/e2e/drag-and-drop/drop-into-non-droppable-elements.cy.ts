import data from '@src/data';
import { getContainerForTest, getRectangle } from '@cypress/utils';
import { getAllCustomComponents } from '@src/utils';
import { ElementType } from '@src/types';
import { generateElementTestId } from '@src/utils/tests';

describe('Drop into non droppable elements', () => {
  const elements = getAllCustomComponents();
  let nonDroppableElements: ElementType[] = [];
  let allElements: ElementType[] = [];

  Object.keys(elements).forEach((key) => {
    if (!elements[key].data.props.className.includes('droppable')) {
      nonDroppableElements.push(elements[key].data);
    }
    allElements.push(elements[key].data);
  });

  beforeEach(() => {
    cy.visit('/editor');
  });

  const dragAndDrop = (sourceTestId: string, targetTestId: string): any => {
    const dataTransfer = new DataTransfer();
    cy.get(sourceTestId).trigger('dragstart', { dataTransfer });

    cy.get(targetTestId)
      .trigger('dragenter', { dataTransfer })
      .trigger('dragover', { dataTransfer });

    cy.get(sourceTestId).trigger('dragend');
  };

  nonDroppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can drag and drop ${child.type} into ${element.type}`, () => {
        element.props['data-testid'] = 'non-droppable-element';
        console.log({ element });
        data.set(getContainerForTest(element));

        const source = generateElementTestId(child, true);
        const target = `[data-testid="${element.props['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        dragAndDrop(source, target);

        cy.get(target).children().should('have.length', 0);

        cy.get(testContainer).children().should('have.length', 2);

        cy.get(testContainer)
          .children()
          .eq(1)
          .should('have.class', `fr-${child.type.toLowerCase()}`);
        cy.reload();
        cy.get(testContainer)
          .children()
          .eq(1)
          .should('have.class', `fr-${child.type.toLowerCase()}`);
      });
    });
  });
});
