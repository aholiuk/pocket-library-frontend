import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  private userService = inject(UserService);
  private tokenService = inject(TokenService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  isLoading = true;
  currentUserId = '';

  ngOnInit(): void {
    this.currentUserId = (this.tokenService.getParsedToken()?.['sub'] as string) ?? '';

    setTimeout(() => {
      this.loadUsers();
    }, 500);
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteUser(keycloakId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(keycloakId).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Failed to delete user', err)
      });
    }
  }
}