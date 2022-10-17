import data from '@src/data';
import { getContainerForTest, getRectangle, reloadPage } from '@cypress/utils';
import { getAllRegisteredElements } from '@src/utils';
import { calculator } from '@src/pages/Editor/Resizer';
import { ElementType } from '@src/types';
import { generateHandlerTestId } from '@src/utils/tests';
import global from '@src/global';

describe('Resize elements width', () => {
  const elements = getAllRegisteredElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
    cy.visit('/editor');
  });

  Object.keys(elements).forEach((key, index) => {
    const element: ElementType = {
      ...elements[key].data,
      id: String(index + 1),
    };
    //override props
    element.props.width = '100px';
    element['data-testid'] = 'resizable-element';

    const editHandler = generateHandlerTestId(element, true);
    const resizableElement = `[data-testid="resizable-element"]`;
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
      cy.get(resizableElement).click();

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
          reloadPage();
          cy.get(resizableElement).click();

          // to make sure the width is persisted to local storage
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);
        });
    });

    it(`can resize the width using left width resizer for ${key}`, () => {
      // override elements data
      const tempData: ElementType = element;
      tempData.props.width = '560.375px';
      const mouse = {
        clientX: 558,
        clientY: 380,
      };
      let currentWidth = 0;

      element['data-testid'] = 'resizable-element';
      data.set(getContainerForTest(tempData));
      cy.get(resizableElement).click();

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
          reloadPage();
          cy.get(resizableElement).click();

          // to make sure the width is persisted to local storage
          cy.get(editHandler).should('have.css', 'width', `${currentWidth}px`);
        });
    });
  });
});

describe('Resize elements height', () => {
  const elements = getAllRegisteredElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
    cy.visit('/editor');
  });

  Object.keys(elements).forEach((key, index) => {
    let tmpData: ElementType = { ...elements[key].data, id: String(index + 1) };
    tmpData['data-testid'] = 'resizable-element';

    const resizableElement = `[data-testid="resizable-element"]`;
    const editHandler = generateHandlerTestId(tmpData, true);
    const topHeightResizer = '[data-testid="top-height-resizer"]';
    const bottomHeightResizer = '[data-testid="bottom-height-resizer"]';

    it(`can resize the height using top height resizer for ${key}`, () => {
      let mouse = {
        clientX: 804,
        clientY: 316,
      };
      let currentHeight = 0;
      tmpData.props.width = '121.5px';
      // override elements data
      data.set(getContainerForTest(tmpData));
      cy.get(resizableElement).click();

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
          reloadPage();
          cy.get(resizableElement).click();

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

      tmpData.props.height = '54.5px';
      // override elements data
      data.set(getContainerForTest(tmpData));
      cy.get(resizableElement).click();

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
          reloadPage();
          cy.get(resizableElement).click();

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
