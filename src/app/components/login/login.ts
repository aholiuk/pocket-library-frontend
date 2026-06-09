import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private keycloak = inject(KeycloakService);
  private tokenService = inject(TokenService);

  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.tokenService.setTokens(response.access_token, response.refresh_token);
        const kc = this.keycloak.getKeycloakInstance();
        kc.token = response.access_token;
        kc.refreshToken = response.refresh_token;
        kc.authenticated = true;
        kc.tokenParsed = JSON.parse(atob(response.access_token.split('.')[1]));
        this.isLoading = false;
        window.location.href = '/books';
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
        this.isLoading = false;
      }
    });
  }
}