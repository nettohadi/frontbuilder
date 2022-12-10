import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: [
      '**/*/elements.cy.ts',
      '**/*/drop-into-elements.cy.ts',
      '**/*/edit-props.cy.ts',
      '**/*/reorder-against-elements.cy.ts',
    ],
  },
});
