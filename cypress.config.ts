import { defineConfig } from 'cypress';

import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:9093',
    specPattern: 'cypress/e2e/**/*.cy.spec.ts',
    supportFile: 'cypress/support/e2e.ts',
    screenshotsFolder: 'cypress/snapshots/actual',
    setupNodeEvents(on, config) {
      coverage(on, config);

      return config;
    },
  },
  component: {
    specPattern: 'src/**/*.cy.spec.ts',
    screenshotsFolder: 'cypress/snapshots/actual',
    setupNodeEvents(on, config) {
      coverage(on, config);

      return config;
    },
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
