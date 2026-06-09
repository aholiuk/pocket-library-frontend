import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  private apiUrl = '/api/reviews';
  private tokenService = inject(TokenService);

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken() 
      ?? this.keycloak.getKeycloakInstance()?.token 
      ?? '';
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // GET /reviews — all reviews
  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // GET /reviews/book/{bookId} — reviews for a specific book
  getByBook(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/book/${bookId}`, { headers: this.getHeaders() });
  }

  // GET /reviews/user/{userId} — reviews by a specific user
  getByUser(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
  }

  // POST /reviews?bookId=X — create a review
  // the text goes in the body, bookId goes as a query parameter
  create(bookId: number, text: string): Observable<Review> {
    const headers = this.getHeaders().set('Content-Type', 'text/plain');
    return this.http.post<Review>(`${this.apiUrl}?bookId=${bookId}`, text, { headers });
  }
}