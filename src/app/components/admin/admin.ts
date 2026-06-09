import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
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
    }, 500);
  }
}