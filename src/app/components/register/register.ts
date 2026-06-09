import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  username = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  register(): void {
    if (!this.username.trim() || !this.email.trim() ||
        !this.password.trim() || !this.firstName.trim() ||
        !this.lastName.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.username.trim().length < 3) {
      this.errorMessage = 'Username must be at least 3 characters.';
      return;
    }

    if (this.password.trim().length < 3) {
      this.errorMessage = 'Password must be at least 3 characters.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }).subscribe({
      next: () => {
        this.successMessage = 'Account created! Signing you in...';
        this.isLoading = false;

        setTimeout(() => {
          this.authService.login(this.username, this.password).subscribe({
            next: (response) => {
              this.tokenService.setTokens(response.access_token, response.refresh_token);
              window.location.href = '/books';
            },
            error: () => {
              this.router.navigate(['/login']);
            }
          });
        }, 500);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = 'Username or email already exists.';
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.isLoading = false;
      }
    });
  }
}