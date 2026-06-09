import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  private apiUrl = '/api/users';
  private tokenService = inject(TokenService);

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken() 
      ?? this.keycloak.getKeycloakInstance()?.token 
      ?? '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // GET /users/me — get currently logged in user
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }

  // GET /users — get all users (admin only)
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() });
  }
}