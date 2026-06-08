import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root' // one instance shared across the whole app
})
export class BookService {
  // inject HttpClient — Angular's built-in tool for making HTTP requests
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  // /api prefix is intercepted by proxy and forwarded to localhost:9090
  private apiUrl = '/api/books';

    private getHeaders(): HttpHeaders {
    const token = this.keycloak.getKeycloakInstance().token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // GET /books — fetch all books
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // GET /books/{id} — fetch one book by id
  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // POST /books — create new book (admin only)
  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, { headers: this.getHeaders() });
  }

  // PUT /books/{id} — update full book (admin only)
  update(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book, { headers: this.getHeaders() });
  }

  // DELETE /books/{id} — delete book (admin only)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // PATCH /books/{id} — update pages read (any logged in user)
  updatePagesRead(id: number, pagesRead: number): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, pagesRead, { headers: this.getHeaders() });
  }

  // PATCH /books/{id}/rating — rate a book (any logged in user)
  rateBook(id: number, rating: number): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}/rating`, rating, { headers: this.getHeaders() });
  }

  getByUser(keycloakId: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/user/${keycloakId}`, { headers: this.getHeaders() });
  }
}