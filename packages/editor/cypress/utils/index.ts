import { ElementType } from '../../src/types';
import { REACT_APP_SUPABASE_URL } from './constants';

export const getRectangle = (el: any) => el[0].getBoundingClientRect();

export const getContainerForTest = (children: any = '') => ({
  id: '0.1',
  type: 'Box',
  isFunctionComponent: true,
  'data-testid': 'test-container',
  className: 'fr-box droppable',
  props: {
    padding: '5px',
    height: '90vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: Array.isArray(children) ? children : [children],
});

export const reloadPage = () => {
  cy.wait(700);
  cy.reload();
};

export const getByTestId = (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
};

export const interceptPageApi = (data: ElementType) => {
  cy.intercept(
    'GET',
    `${REACT_APP_SUPABASE_URL}/rest/v1/pages?select=*&id=eq.*`,
    {
      statusCode: 200,
      body: {
        draft: data,
      },
    }
  );

  cy.intercept(
    'GET',
    `${REACT_APP_SUPABASE_URL}/rest/v1/pages?select=*&user_id=eq.*`,
    {
      statusCode: 200,
      body: [],
    }
  );
};

export const interceptProfilesApi = () => {
  cy.intercept('GET', `${REACT_APP_SUPABASE_URL}/rest/v1/profiles?select=*`, {
    statusCode: 200,
    body: {
      data: {
        avatar_url: null,
        email: 'hadi.syahbal@gmail.com',
        full_name: 'Hadi Syahbal',
        updated_at: '2022-11-22T14:31:57+00:00',
      },
    },
  });
};
