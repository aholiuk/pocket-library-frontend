import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = '/api/users';

  // GET /users/me — get currently logged in user
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  // GET /users — get all users (admin only)
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}