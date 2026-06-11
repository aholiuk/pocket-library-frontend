import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

// helper to create a fake JWT token with a payload
function createFakeToken(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.fakesignature`;
}

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve tokens', () => {
    service.setTokens('my-token', 'my-refresh');
    expect(service.getToken()).toBe('my-token');
    expect(service.getRefreshToken()).toBe('my-refresh');
  });

  it('should return null when no token is set', () => {
    expect(service.getToken()).toBeNull();
    expect(service.getRefreshToken()).toBeNull();
  });

  it('should clear tokens', () => {
    service.setTokens('my-token', 'my-refresh');
    service.clearTokens();
    expect(service.getToken()).toBeNull();
    expect(service.getRefreshToken()).toBeNull();
  });

  it('should return false for isAuthenticated when no token', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return false for isAuthenticated when token is expired', () => {
    const expiredToken = createFakeToken({ exp: Math.floor(Date.now() / 1000) - 3600 });
    service.setTokens(expiredToken, '');
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return true for isAuthenticated when token is valid', () => {
    const validToken = createFakeToken({ exp: Math.floor(Date.now() / 1000) + 3600 });
    service.setTokens(validToken, '');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should parse token and return username', () => {
    const token = createFakeToken({ preferred_username: 'anna', exp: Math.floor(Date.now() / 1000) + 3600 });
    service.setTokens(token, '');
    expect(service.getUsername()).toBe('anna');
  });

  it('should return empty string for username when no token', () => {
    expect(service.getUsername()).toBe('');
  });

  it('should return true for isAdmin when user has admin role', () => {
    const token = createFakeToken({
      exp: Math.floor(Date.now() / 1000) + 3600,
      resource_access: { 'pocket-library': { roles: ['admin'] } }
    });
    service.setTokens(token, '');
    expect(service.isAdmin()).toBe(true);
  });

  it('should return false for isAdmin when user has no admin role', () => {
    const token = createFakeToken({
      exp: Math.floor(Date.now() / 1000) + 3600,
      resource_access: { 'pocket-library': { roles: ['read'] } }
    });
    service.setTokens(token, '');
    expect(service.isAdmin()).toBe(false);
  });
});