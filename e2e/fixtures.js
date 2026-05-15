const { test: base, request } = require('@playwright/test');

// Extend the base test to provide an authenticated API request context
const test = base.extend({
  authenticatedRequest: async ({}, use) => {
    // 1. Create a default context to perform the login
    const loginContext = await request.newContext();
    const loginResponse = await loginContext.post('/api/auth/login', {
      data: {
        email: 'test.user@example.com',
        password: 'password123',
      },
    });
    
    const { token } = await loginResponse.json();
    await loginContext.dispose(); // Close the login context

    // 2. Create a new context with the Authorization header set
    const authContext = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 3. Pass the authenticated context to the test
    await use(authContext);

    // 4. Clean up the context after the test
    await authContext.dispose();
  },
});

// Export test and expect so spec files can use them
module.exports = { test, expect: base.expect };