import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Friend } from '../../models/friend.model';
import { FriendService } from '../../services/friend.service';

@Component({
  selector: 'app-friend-list',
  imports: [FormsModule],
  templateUrl: './friend-list.html',
  styleUrl: './friend-list.scss'
})
export class FriendList implements OnInit {
  private friendService = inject(FriendService);

  friends: Friend[] = [];
  isLoading = true;
  newFriendId = '';
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.friendService.getAll().subscribe({
      next: (data) => {
        this.friends = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load friends', err);
        this.isLoading = false;
      }
    });
  }

  addFriend(): void {
    if (!this.newFriendId.trim()) {
      this.errorMessage = 'Please enter a user ID.';
      return;
    }

    this.friendService.addFriend(this.newFriendId).subscribe({
      next: () => {
        this.successMessage = 'Friend added!';
        this.newFriendId = '';
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 3000);
        // reload friends list
        this.ngOnInit();
      },
      error: () => {
        this.errorMessage = 'Failed to add friend.';
      }
    });
  }

  viewBookshelf(friendId: string): void {
    console.log('View bookshelf of:', friendId);
  }
}