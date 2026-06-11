import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../models/friend.model';
import { User } from '../../models/user.model';
import { FriendService } from '../../services/friend.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-list',
  imports: [FormsModule],
  templateUrl: './friend-list.html',
  styleUrl: './friend-list.scss'
})
export class FriendList implements OnInit {
  private friendService = inject(FriendService);
  private keycloak = inject(KeycloakService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  friends: Friend[] = [];
  isLoading = true;

  searchUsername = '';
  searchResult: User | null = null;
  searchError = '';
  searchLoading = false;

  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.loadFriends();
    }, 500);
  }

  loadFriends(): void {
    this.friendService.getAll().subscribe({
      next: (data) => {
        this.friends = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load friends', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  searchUser(): void {
    if (!this.searchUsername.trim()) {
      this.searchError = 'Please enter a username to search.';
      return;
    }
    this.searchLoading = true;
    this.searchResult = null;
    this.searchError = '';

    this.friendService.searchByUsername(this.searchUsername).subscribe({
      next: (user) => {
        this.searchResult = user;
        this.searchLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.searchError = 'User not found.';
        this.searchLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addFriend(friendId: string): void {
    this.keycloak.getKeycloakInstance().updateToken(5).then(() => {
      this.friendService.addFriend(friendId).subscribe({
        next: () => {
          this.successMessage = 'Friend added!';
          this.searchResult = null;
          this.searchUsername = '';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadFriends();
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage = 'You are already friends!';
          } else if (err.status === 400) {
            this.errorMessage = 'You cannot add yourself as a friend.';
          } else {
            this.errorMessage = 'Could not add friend.';
          }
          setTimeout(() => this.errorMessage = '', 3000);
          this.cdr.detectChanges();
        }
      });
    });
  }

  deleteFriend(friendshipId: number): void {
    this.friendService.deleteFriend(friendshipId).subscribe({
      next: () => {
        this.successMessage = 'Friend removed.';
        setTimeout(() => this.successMessage = '', 3000);
        this.loadFriends();
      },
      error: () => {
        this.errorMessage = 'Could not remove friend.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  isAlreadyFriend(keycloakId: string): boolean {
    return this.friends.some(f => f.friend?.keycloakId === keycloakId);
  }

  viewBookshelf(friendId: string, friendUsername: string): void {
    this.router.navigate(['/friends', friendId, 'books'], { 
    queryParams: { username: friendUsername } 
  });
  }
}