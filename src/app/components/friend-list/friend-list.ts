import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../models/friend.model';

@Component({
  selector: 'app-friend-list',
  imports: [FormsModule],
  templateUrl: './friend-list.html',
  styleUrl: './friend-list.scss'
})
export class FriendList implements OnInit {

  friends: Friend[] = [];
  isLoading = true;
  newFriendId = '';
  errorMessage = '';
  successMessage = '';

  // dummy data — will be replaced with friendService.getAll() later
  ngOnInit(): void {
    this.friends = [
      { id: 1, user: { keycloakId: 'user-1', username: 'Anna' }, friend: { keycloakId: 'user-2', username: 'Maria' } },
      { id: 2, user: { keycloakId: 'user-1', username: 'Anna' }, friend: { keycloakId: 'user-3', username: 'Lena' } },
      { id: 3, user: { keycloakId: 'user-1', username: 'Anna' }, friend: { keycloakId: 'user-4', username: 'Sophie' } },
    ];
    this.isLoading = false;
  }

  addFriend(): void {
    if (!this.newFriendId.trim()) {
      this.errorMessage = 'Please enter a user ID.';
      return;
    }

    // will call friendService.addFriend() later
    console.log('Adding friend:', this.newFriendId);
    this.successMessage = 'Friend request sent!';
    this.newFriendId = '';
    this.errorMessage = '';
    setTimeout(() => this.successMessage = '', 3000);
  }

  // navigate to friend's bookshelf — will implement later
  viewBookshelf(friendId: string): void {
    console.log('View bookshelf of:', friendId);
  }
}