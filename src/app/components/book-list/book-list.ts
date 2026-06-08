import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router);
  private keycloak = inject(KeycloakService);
  private cdr = inject(ChangeDetectorRef);

  books: Book[] = [];
  isLoading = true;
  isLoggedIn = false;

  hoveredBookId: number | null = null;

  spineColors = [
    '#356789', '#655D21', '#A07B5F', '#B2DBAF',
    '#652121', '#214365', '#51361A', '#216565'
  ];

  spineHeights = [160, 180, 195, 170];

ngOnInit(): void {
  this.isLoggedIn = this.keycloak.isLoggedIn();

  // ensure token is valid before making requests
  this.keycloak.getKeycloakInstance().updateToken(5)
    .then(() => {
      this.bookService.getAll().subscribe({
        next: (data) => {
          this.books = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load books', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    })
    .catch(() => {
      // token refresh failed — redirect to login
      this.keycloak.login();
    });
}
  getSpineColor(index: number): string {
    return this.spineColors[index % this.spineColors.length];
  }

  getSpineHeight(index: number): number {
    return this.spineHeights[index % this.spineHeights.length];
  }

  getSpineWidth(totalPages: number): number {
    if (totalPages < 200) return 38;
    if (totalPages < 350) return 50;
    if (totalPages < 500) return 62;
    return 74;
  }

  openBook(id: number): void {
    this.router.navigate(['/books', id]);
  }

  addBook(): void {
    console.log('addBook called');
    this.router.navigate(['/books/new']);
  }
}