import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  private keycloak = inject(KeycloakService);

  isLoggedIn = false;
  isAdmin = false;
  username = '';

ngOnInit(): void {
  this.isLoggedIn = this.keycloak.isLoggedIn();

  if (this.isLoggedIn) {
    try {
      this.isAdmin = this.keycloak.isUserInRole('admin');
      // getUsername can throw if profile not loaded — use token instead
      const token = this.keycloak.getKeycloakInstance().tokenParsed;
      this.username = token?.['preferred_username'] ?? '';
    } catch (e) {
      console.warn('Could not load user profile', e);
    }
  }
}

  login(): void {
    this.keycloak.login({
      redirectUri: window.location.origin
    });
  }

  logout(): void {
    this.keycloak.logout(window.location.origin);
  }
}