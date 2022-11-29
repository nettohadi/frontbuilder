import {
  getContainerForTest,
  getRectangle,
  interceptPageApi,
  interceptProfilesApi,
} from '@cypress/utils';
import { getAllRegisteredElements } from '@src/utils';
import { calculator } from '@src/pages/Editor/Resizer';
import { ElementType } from '@src/types';
import { generateHandlerTestId } from '@src/utils/tests';

const timeout = 10000;

describe('Resize elements width', () => {
  const elements = getAllRegisteredElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
  });

  Object.keys(elements).forEach((key) => {
    const element: ElementType = {
      ...elements[key].data,
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

      interceptPageApi(getContainerForTest(element));
      interceptProfilesApi();
      cy.visit('/1/2');

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
          cy.get(editHandler, { timeout }).should(
            'have.css',
            'width',
            `${currentWidth}px`
          );

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
          // assertion
          cy.get(editHandler, { timeout }).should(
            'have.css',
            'width',
            `${currentWidth}px`
          );
        })
        .trigger('mouseup');
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

      interceptPageApi(getContainerForTest(tempData));
      interceptProfilesApi();
      cy.visit('/1/2');

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
          cy.get(editHandler, { timeout }).should(
            'have.css',
            'width',
            `${currentWidth}px`
          );

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
          // assertion
          cy.get(editHandler, { timeout }).should(
            'have.css',
            'width',
            `${currentWidth}px`
          );
        })
        .trigger('mouseup');
    });
  });
});

describe('Resize elements height', () => {
  const elements = getAllRegisteredElements();

  beforeEach(() => {
    cy.viewport(1447, 844);
  });

  Object.keys(elements).forEach((key) => {
    let tmpData: ElementType = { ...elements[key].data };
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

      interceptPageApi(getContainerForTest(tmpData));
      interceptProfilesApi();
      cy.visit('/1/2');

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
          cy.get(editHandler, { timeout }).should(
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
          // assertion
          cy.get(editHandler, { timeout }).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );
        })
        .trigger('mouseup');
    });

    it(`can resize the height using bottom height resizer for ${key}`, () => {
      let mouse = {
        clientX: 816,
        clientY: 451,
      };
      let currentHeight = 0;

      tmpData.props.height = '54.5px';

      interceptPageApi(getContainerForTest(tmpData));
      interceptProfilesApi();
      cy.visit('/1/2');

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
          cy.get(editHandler, { timeout }).should(
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
          // assertion
          cy.get(editHandler, { timeout }).should(
            'have.css',
            'height',
            `${currentHeight}px`
          );
        })
        .trigger('mouseup');
    });
  });
});
