import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root' // one instance shared across the whole app
})
export class BookService {
  // inject HttpClient — Angular's built-in tool for making HTTP requests
  private http = inject(HttpClient);

  // /api prefix is intercepted by proxy and forwarded to localhost:9090
  private apiUrl = '/api/books';

  // GET /books — fetch all books
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // GET /books/{id} — fetch one book by id
  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // POST /books — create new book (admin only)
  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // PUT /books/{id} — update full book (admin only)
  update(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  // DELETE /books/{id} — delete book (admin only)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // PATCH /books/{id} — update pages read (any logged in user)
  updatePagesRead(id: number, pagesRead: number): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}`, pagesRead);
  }

  // PATCH /books/{id}/rating — rate a book (any logged in user)
  rateBook(id: number, rating: number): Observable<Book> {
    return this.http.patch<Book>(`${this.apiUrl}/${id}/rating`, rating);
  }
}