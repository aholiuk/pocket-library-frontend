import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

// This guard checks: is the user logged in at all?
export const authGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  // Ask Keycloak: is there a valid token?
  const isLoggedIn = keycloak.isLoggedIn();

  if (isLoggedIn) {
    return true; // yes → let them through
  }

  // No → send them to Keycloak login page
  await keycloak.login({
    redirectUri: window.location.origin // after login, come back to our app
  });

  return false;
};

// This guard checks: is the user an admin?
export const adminGuard: CanActivateFn = async () => {
  const keycloak = inject(KeycloakService);
  const router = inject(Router);

  const isLoggedIn = keycloak.isLoggedIn();

  if (!isLoggedIn) {
    await keycloak.login({
      redirectUri: window.location.origin
    });
    return false;
  }

  // Check if the user has the admin role
  const isAdmin = keycloak.isUserInRole('admin');

  if (isAdmin) {
    return true; // yes → let them through
  }

  // Logged in but not admin → redirect to books page
  router.navigate(['/books']);
  return false;
};