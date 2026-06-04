import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http = inject(HttpClient);
  private apiUrl = '/api/friends';

  // GET /friends — get my friend list
  getAll(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.apiUrl);
  }

  // POST /friends/{friendId} — add a friend by their userId
  addFriend(friendId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${friendId}`, null);
  }
}