import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {

  users: User[] = [];
  isLoading = true;

  ngOnInit(): void {
    // dummy data — will be replaced with userService.getAll() later
    this.users = [
      { keycloakId: 'user-1', username: 'Anna' },
      { keycloakId: 'user-2', username: 'Maria' },
      { keycloakId: 'user-3', username: 'Lena' },
      { keycloakId: 'user-4', username: 'Sophie' },
    ];
    this.isLoading = false;
  }
}