import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api/auth';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(data: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, data, {
      responseType: 'text' as 'json'
    });
  }
}