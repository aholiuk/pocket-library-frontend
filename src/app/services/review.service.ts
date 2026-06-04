import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = '/api/reviews';

  // GET /reviews — all reviews
  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  // GET /reviews/book/{bookId} — reviews for a specific book
  getByBook(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/book/${bookId}`);
  }

  // GET /reviews/user/{userId} — reviews by a specific user
  getByUser(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`);
  }

  // POST /reviews?bookId=X — create a review
  // the text goes in the body, bookId goes as a query parameter
  create(bookId: number, text: string): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}?bookId=${bookId}`, text, {
      headers: { 'Content-Type': 'text/plain' } // backend expects plain string not JSON
    });
  }
}