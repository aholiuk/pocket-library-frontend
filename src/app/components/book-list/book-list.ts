import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  imports: [],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  private bookService = inject(BookService);
  private router = inject(Router);

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
    // dummy data — will be replaced with real API call later
    this.books = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', totalPages: 180, pagesRead: 90, progress: 50, rating: 8 },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', totalPages: 281, pagesRead: 281, progress: 100, rating: 9 },
      { id: 3, title: '1984', author: 'George Orwell', totalPages: 328, pagesRead: 50, progress: 15, rating: 1 },
      { id: 4, title: 'Dune', author: 'Frank Herbert', totalPages: 412, pagesRead: 200, progress: 48, rating: 10 },
      { id: 5, title: 'Brave New World', author: 'Aldous Huxley', totalPages: 311, pagesRead: 100, progress: 32, rating: 7 },
      { id: 6, title: 'Jane Eyre', author: 'Charlotte Brontë', totalPages: 500, pagesRead: 500, progress: 100, rating: 9 },
    ];
    this.isLoading = false;
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