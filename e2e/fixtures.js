const { test: base } = require('@playwright/test');

// Extend the base test to provide an authenticated API request context
const test = base.extend({
  authenticatedRequest: async ({ request }, use) => {
    // Log in using the seeded user
    const loginResponse = await request.post('/api/auth/login', {
      data: {
        email: 'admin@example.com',
        password: '123456',
      },
    });
    
    const { token } = await loginResponse.json();

    // Create a new request context with the Authorization header
    const authRequest = await request.context().request;

    // Attach the token to the default headers for subsequent requests
    authRequest._options.extraHTTPHeaders = {
      ...authRequest._options.extraHTTPHeaders,
      Authorization: `Bearer ${token}`,
    };

    await use(authRequest);
  },
});

module.exports = { test };