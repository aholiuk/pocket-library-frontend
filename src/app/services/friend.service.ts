import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend.model';
import { User } from '../models/user.model';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private http = inject(HttpClient);
  private keycloak = inject(KeycloakService);
  private apiUrl = '/api/friends';

  private getHeaders(): HttpHeaders {
    const token = this.keycloak.getKeycloakInstance().token;
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // GET /friends — get my friend list
  getAll(): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // search user by username before addin
  searchByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/search?username=${username}`, { headers: this.getHeaders() });
  }

  // POST /friends/{friendId} — add a friend by their userId
  addFriend(friendId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${friendId}`, null, { headers: this.getHeaders() });
  }

  deleteFriend(friendshipId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${friendshipId}`, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }
}