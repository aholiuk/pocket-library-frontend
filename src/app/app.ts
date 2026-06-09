import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  title = 'pocket-library-frontend';

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}