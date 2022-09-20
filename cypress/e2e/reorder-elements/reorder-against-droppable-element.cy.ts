import data from '@src/data';
import { getContainerForTest } from '@cypress/utils';
import { getAllCustomComponents } from '@src/utils';
import { ElementType } from '@src/types';
import { generateElementTestId } from '@src/utils/tests';

describe('Reorder against droppable elements', () => {
  const elements = getAllCustomComponents();
  let droppableElements: ElementType[] = [];
  let allElements: ElementType[] = [];

  Object.keys(elements).forEach((key) => {
    if (elements[key].data.props.className.includes('droppable')) {
      droppableElements.push(JSON.parse(JSON.stringify(elements[key].data)));
    }
    allElements.push(elements[key].data);
  });

  beforeEach(() => {
    cy.visit('/editor');
  });

  const putSourceBeforeTarget = (
    sourceTestId: string,
    targetTestId: string
  ): any => {
    const dataTransfer = new DataTransfer();
    cy.get(sourceTestId).trigger('dragstart', { dataTransfer });

    cy.get(targetTestId)
      .trigger('dragenter', { dataTransfer })
      .trigger('dragover', 'left', { dataTransfer });

    cy.get(sourceTestId).trigger('dragend');
  };

  const putSourceAfterTarget = (
    sourceTestId: string,
    targetTestId: string
  ): any => {
    const dataTransfer = new DataTransfer();
    cy.get(sourceTestId).trigger('dragstart', { dataTransfer });

    cy.get(targetTestId)
      .trigger('dragenter', { dataTransfer })
      .trigger('dragover', 'right', { dataTransfer });

    cy.get(sourceTestId).trigger('dragend');
  };

  droppableElements.forEach((element) => {
    allElements.forEach((child) => {
      it(`can put ${child.type} before ${element.type}`, () => {
        element.props['data-testid'] = 'droppable-element';
        child.props['data-testid'] = 'element-to-reorder';

        data.set(getContainerForTest([element, child]));

        const source = `[data-testid="${child.props['data-testid']}"]`;
        const target = `[data-testid="${element.props['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        putSourceBeforeTarget(source, target);

        cy.get(testContainer).children().should('have.length', 2);
        cy.get(testContainer)
          .children()
          .eq(0)
          .children()
          .first()
          .should('have.attr', 'data-testid', 'element-to-reorder');
        cy.get(testContainer)
          .children()
          .eq(1)
          .children()
          .first()
          .should('have.attr', 'data-testid', 'droppable-element');
      });

      it(`can put ${child.type} after ${element.type}`, () => {
        element.props['data-testid'] = 'droppable-element';
        child.props['data-testid'] = 'element-to-reorder';

        data.set(getContainerForTest([child, element]));

        const source = `[data-testid="${child.props['data-testid']}"]`;
        const target = `[data-testid="${element.props['data-testid']}"]`;
        const testContainer = `[data-testid="test-container"]`;

        putSourceAfterTarget(source, target);

        cy.get(testContainer).children().should('have.length', 2);
        cy.get(testContainer)
          .children()
          .eq(0)
          .children()
          .first()
          .should('have.attr', 'data-testid', 'droppable-element');
        cy.get(testContainer)
          .children()
          .eq(1)
          .children()
          .first()
          .should('have.attr', 'data-testid', 'element-to-reorder');
      });
    });
  });
});
