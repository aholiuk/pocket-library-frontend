import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { KeycloakService } from 'keycloak-angular';

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
        // store the token in Keycloak instance
        const kc = this.keycloak.getKeycloakInstance();
        kc.token = response.access_token;
        kc.refreshToken = response.refresh_token;

        this.isLoading = false;
        this.router.navigate(['/books']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
        this.isLoading = false;
      }
    });
  }
}