export const mockKeycloakService = {
  getKeycloakInstance: () => ({
    token: 'mock-token',
    authenticated: true,
    tokenParsed: { sub: 'user-id', preferred_username: 'testuser' },
    updateToken: () => Promise.resolve(true)
  }),
  isLoggedIn: () => true,
  isUserInRole: () => false
};

export const mockTokenService = {
  getToken: () => 'mock-token',
  setTokens: () => { return; },
  clearTokens: () => { return; },
  isAuthenticated: () => true,
  isAdmin: () => false,
  getUsername: () => 'testuser',
  getParsedToken: () => ({ sub: 'user-id', preferred_username: 'testuser' })
};