const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true,
  },
  // Use a direct string path with the .js extension
  globalSetup: './e2e/global-setup.js', 
});