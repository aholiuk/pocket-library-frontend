import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  private apiUrl = '/api/quiz';

  private getHeaders(): HttpHeaders {
    const token = this.keycloak.getKeycloakInstance().token;
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // POST /quiz — submit quiz answers
  submit(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, quiz, { headers: this.getHeaders() });
  }
}