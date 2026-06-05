import { Component, inject, OnInit } from '@angular/core';
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

  books: Book[] = [];
  isLoading = true;
  isAdmin = true;

  // tracks which book the user is hovering over
  hoveredBookId: number | null = null;

  // each book spine gets a color from this palette
  spineColors = [
    '#356789', '#655D21', '#A07B5F', '#B2DBAF',
    '#652121', '#214365', '#51361A', '#216565'
  ];

ngOnInit(): void {
  this.isAdmin = this.keycloak.isUserInRole('admin');

  this.bookService.getAll().subscribe({
    next: (data) => {
      this.books = data;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Failed to load books', err);
      this.isLoading = false;
    }
  });
}

  // returns a color for each book based on its index
  getSpineColor(index: number): string {
    return this.spineColors[index % this.spineColors.length];
  }

  // 4 different heights for variety
spineHeights = [160, 180, 195, 170];

getSpineHeight(index: number): number {
  return this.spineHeights[index % this.spineHeights.length];
}

// width based on page count
getSpineWidth(totalPages: number): number {
  if (totalPages < 200) return 38;
  if (totalPages < 350) return 50;
  if (totalPages < 500) return 62;
  return 74;
}

  // navigate to book detail page on click
  openBook(id: number): void {
    this.router.navigate(['/books', id]);
  }
}