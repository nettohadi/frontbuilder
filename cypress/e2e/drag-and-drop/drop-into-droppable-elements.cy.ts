import data from '@src/data';
import { getContainerForTest } from '@cypress/utils';
import { getAllCustomComponents } from '@src/utils';
import { ElementType } from '@src/types';
import { generateElementTestId } from '@src/utils/tests';

describe('Drop into droppable elements', () => {
  const elements = getAllCustomComponents();
  let droppableElements: ElementType[] = [];
  let allElements: ElementType[] = [];

  Object.keys(elements).forEach((key) => {
    if (elements[key].data.props.className.includes('droppable')) {
      droppableElements.push(elements[key].data);
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

  droppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can drag and drop ${child.type} into ${element.type}`, () => {
        element.props['data-testid'] = 'droppable-element';

        data.set(getContainerForTest(element));

        const source = generateElementTestId(child, true);
        const target = `[data-testid="${element.props['data-testid']}"]`;

        dragAndDrop(source, target);

        cy.get(target).children().should('have.length', 1);
        cy.get(target)
          .children()
          .should('have.class', `fr-${child.type.toLowerCase()}`);
        cy.reload();
        cy.get(target)
          .children()
          .should('have.class', `fr-${child.type.toLowerCase()}`);
      });
    });
  });
});
