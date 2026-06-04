import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private http = inject(HttpClient);
  private apiUrl = '/api/recommendations';

  // GET /recommendations/{userId} — get recommendations for a user
  getForUser(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${userId}`);
  }
}