const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  // Automatically start the server before tests
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true, // Good for local dev, CI will start a fresh one
  },
  // Run the database seeder before all tests to ensure a clean slate
  globalSetup: require.resolve('./e2e/global-setup'),
});