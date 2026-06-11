import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly TOKEN_KEY = 'kc_token';
  private readonly REFRESH_KEY = 'kc_refresh_token';

  setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const parsed = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < parsed.exp * 1000;
    } catch {
      return false;
    }
  }

  getParsedToken(): Record<string, unknown> | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  getUsername(): string {
    const token = this.getParsedToken();
    return (token?.['preferred_username'] as string) ?? '';
  }

  isAdmin(): boolean {
  const token = this.getParsedToken();
  const resourceAccess = token?.['resource_access'] as Record<string, {roles: string[]}> | undefined;
  const roles = resourceAccess?.['pocket-library']?.roles ?? [];
  return roles.includes('admin');
  }
}