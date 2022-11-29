import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'yi32tv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
});
