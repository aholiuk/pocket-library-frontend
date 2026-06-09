import { ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    const token = localStorage.getItem('kc_token');
    const refreshToken = localStorage.getItem('kc_refresh_token');

    return keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'PocketLibrary',
        clientId: 'pocket-library'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        token: token ?? undefined,
        refreshToken: refreshToken ?? undefined,
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html'
      }
    }).catch(() => false);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};