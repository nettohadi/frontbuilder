import data from '@src/data';
import { getContainerForTest, getRectangle } from '@cypress/utils';
import { getAllCustomComponents } from '@src/utils';
import { calculator } from '@src/pages/Editor/Resizer';
import { ElementType } from '@src/types';
import { generateHandlerTestId } from '@src/utils/tests';

describe('Resize elements width', () => {
  const elements = getAllCustomComponents();

  beforeEach(() => {
    cy.visit('http://localhost:3000/editor');
  });

  Object.keys(elements).forEach((key, index) => {
    const element: ElementType = { ...elements[key].data, id: index + 1 };
    element.props.style.width = '200px';
    const elementClass = `.fr-${key.toLowerCase()}`;
    const editHandler = generateHandlerTestId(element, true);
    const rightWidthResizer = '[data-testid="right-width-resizer"]';
    const leftWidthResizer = '[data-testid="left-width-resizer"]';

    it(`can resize the width using right width resizer for ${key}`, () => {
      let mouse = {
        clientX: 921,
        clientY: 373,
      };
      let currentWidth = 0;

      // override elements data
      data.set(getContainerForTest(element));
      cy.get(elementClass).click();

      cy.get(editHandler)
        .then(getRectangle)
        .then((rect: any) => {
          const { clientX, clientY } = mouse;
          currentWidth = calculator.width(rect, 'right', clientX, clientY);
          return cy;
        })
        .get(rightWidthResizer)
        .trigger('mousedown')
        .trigger('mousemove', {
          clientX: mouse.clientX,
          clientY: mouse.clientY,
        })
        .then(() => {
          //assertion
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);

          //set new mouse position
          mouse.clientX = 1001;
          mouse.clientY = 374;

          return cy.get(editHandler);
        })
        .then(getRectangle)
        .then((rect: any) => {
          currentWidth = calculator.width(
            rect,
            'right',
            mouse.clientX,
            mouse.clientY
          );

          return cy.get(rightWidthResizer).trigger('mousemove', {
            clientX: mouse.clientX,
            clientY: mouse.clientY,
          });
        })
        .then(() => {
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);
        })
        .trigger('mouseup')
        .then(() => {
          cy.reload();
          cy.get(elementClass).click();

          // to make sure the width is persisted to local storage
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);
        });
    });

    it(`can resize the width using left width resizer for ${key}`, () => {
      // override elements data
      const tempData: ElementType = element;
      tempData.props.style.width = '560.375px';
      const mouse = {
        clientX: 558,
        clientY: 380,
      };
      let currentWidth = 0;

      data.set(getContainerForTest(tempData));
      cy.get(elementClass).click();

      cy.get(editHandler)
        .then(getRectangle)
        .then((rect: any) => {
          const { clientX, clientY } = mouse;
          currentWidth = calculator.width(rect, 'left', clientX, clientY);
          return cy;
        })
        .get(leftWidthResizer)
        .trigger('mousedown')
        .trigger('mousemove', {
          clientX: mouse.clientX,
          clientY: mouse.clientY,
        })
        .then(() => {
          //assertion
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);

          //set new mouse position
          mouse.clientX = 688;
          mouse.clientY = 385;

          return cy.get(editHandler);
        })
        .then(getRectangle)
        .then((rect: any) => {
          currentWidth = calculator.width(
            rect,
            'left',
            mouse.clientX,
            mouse.clientY
          );

          return cy.get(leftWidthResizer).trigger('mousemove', {
            clientX: mouse.clientX,
            clientY: mouse.clientY,
          });
        })
        .then(() => {
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);
        })
        .trigger('mouseup')
        .then(() => {
          cy.reload();
          cy.get(elementClass).click();

          // to make sure the width is persisted to local storage
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);
        });
    });
  });
});

describe('Resize elements height', () => {
  const elements = getAllCustomComponents();

  beforeEach(() => {
    cy.visit('http://localhost:3000/editor');
  });

  Object.keys(elements).forEach((key, index) => {
    let tmpData: ElementType = { ...elements[key].data, id: index + 1 };

    const elementClass = `.fr-${key.toLowerCase()}`;
    const editHandler = generateHandlerTestId(tmpData, true);
    const topHeightResizer = '[data-testid="top-height-resizer"]';
    const bottomHeightResizer = '[data-testid="bottom-height-resizer"]';

    it(`can resize the height using top height resizer for ${key}`, () => {
      let mouse = {
        clientX: 804,
        clientY: 316,
      };
      let currentHeight = 0;
      tmpData.props.style.width = '121.5px';
      // override elements data
      console.log({ tmpData });
      data.set(getContainerForTest(tmpData));
      cy.get(elementClass).click();

      cy.get(editHandler)
        .then(getRectangle)
        .then((rect: any) => {
          const { clientX, clientY } = mouse;
          currentHeight = calculator.height(rect, 'top', clientX, clientY);
          return cy;
        })
        .get(topHeightResizer)
        .trigger('mousedown')
        .trigger('mousemove', {
          clientX: mouse.clientX,
          clientY: mouse.clientY,
        })
        .then(() => {
          //assertion
          cy.get(editHandler).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );

          //set new mouse position
          mouse.clientX = 808;
          mouse.clientY = 269;

          return cy.get(editHandler);
        })
        .then(getRectangle)
        .then((rect: any) => {
          currentHeight = calculator.height(
            rect,
            'top',
            mouse.clientX,
            mouse.clientY
          );

          return cy.get(topHeightResizer).trigger('mousemove', {
            clientX: mouse.clientX,
            clientY: mouse.clientY,
          });
        })
        .then(() => {
          cy.get(editHandler).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );
        })
        .trigger('mouseup')
        .then(() => {
          cy.reload();
          cy.get(elementClass).click();

          // to make sure the width is persisted to local storage
          cy.get(editHandler).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );
        });
    });

    it(`can resize the height using bottom height resizer for ${key}`, () => {
      let mouse = {
        clientX: 816,
        clientY: 451,
      };
      let currentHeight = 0;

      tmpData.props.style.height = '54.5px';
      // override elements data
      data.set(getContainerForTest(tmpData));
      cy.get(elementClass).click();

      cy.get(editHandler)
        .then(getRectangle)
        .then((rect: any) => {
          const { clientX, clientY } = mouse;
          currentHeight = calculator.height(rect, 'bottom', clientX, clientY);
          return cy;
        })
        .get(bottomHeightResizer)
        .trigger('mousedown')
        .trigger('mousemove', {
          clientX: mouse.clientX,
          clientY: mouse.clientY,
        })
        .then(() => {
          //assertion
          cy.get(editHandler).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );

          //set new mouse position
          mouse.clientX = 808;
          mouse.clientY = 429;

          return cy.get(editHandler);
        })
        .then(getRectangle)
        .then((rect: any) => {
          const { clientX, clientY } = mouse;
          currentHeight = calculator.height(rect, 'bottom', clientX, clientY);

          return cy.get(bottomHeightResizer).trigger('mousemove', {
            clientX,
            clientY,
          });
        })
        .then(() => {
          cy.get(editHandler).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );
        })
        .trigger('mouseup')
        .then(() => {
          cy.reload();
          cy.get(elementClass).click();

          // to make sure the width is persisted to local storage
          cy.get(editHandler).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );
        });
    });
  });
});
