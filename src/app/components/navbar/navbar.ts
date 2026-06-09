import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  private keycloak = inject(KeycloakService);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  isLoggedIn = false;
  isAdmin = false;
  username = '';

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isAuthenticated();
    if (this.isLoggedIn) {
      this.isAdmin = this.tokenService.isAdmin();
      this.username = this.tokenService.getUsername();
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.tokenService.clearTokens();
    window.location.href = '/login';
  }
}