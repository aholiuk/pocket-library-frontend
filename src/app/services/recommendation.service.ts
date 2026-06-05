import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  private apiUrl = '/api/recommendations';

  private getHeaders(): HttpHeaders {
    const token = this.keycloak.getKeycloakInstance().token;
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // GET /recommendations/{userId} — get recommendations for a user
  getForUser(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }
}