import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [FormsModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private cdr = inject(ChangeDetectorRef);

  book: Book | null = null;
  isLoading = true;
  isAdmin = true;
  isOpen = false; // controls the flip animation

  newPagesRead: number = 0;
  progressMessage = '';
  ratingMessage = '';

  // dummy books matching the list — will come from service later
  private dummyBooks: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', totalPages: 180, pagesRead: 90, progress: 50, rating: 8 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', totalPages: 281, pagesRead: 281, progress: 100, rating: 9 },
    { id: 3, title: '1984', author: 'George Orwell', totalPages: 328, pagesRead: 50, progress: 15, rating: 1 },
    { id: 4, title: 'Dune', author: 'Frank Herbert', totalPages: 412, pagesRead: 200, progress: 48, rating: 10 },
    { id: 5, title: 'Brave New World', author: 'Aldous Huxley', totalPages: 311, pagesRead: 100, progress: 32, rating: 7 },
    { id: 6, title: 'Jane Eyre', author: 'Charlotte Brontë', totalPages: 500, pagesRead: 500, progress: 100, rating: 9 },
  ];

  // dummy reviews — will come from service later
  reviews = [
    { text: 'A timeless classic, beautifully written.', username: 'Anna H.' },
    { text: 'Short but deeply moving.', username: 'Reader' },
  ];

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.book = this.dummyBooks.find(b => b.id === id) ?? this.dummyBooks[0];
  this.newPagesRead = this.book.pagesRead ?? 0;
  this.isLoading = false;
  this.cdr.detectChanges(); 

  console.log('before timeout, isOpen:', this.isOpen);
  setTimeout(() => {
    this.isOpen = true;
    this.cdr.detectChanges();
    console.log('after timeout, isOpen:', this.isOpen);
  }, 50);
}

  // returns array [1..10] for star rendering
  getStars(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  // called when user clicks a star
  setRating(star: number): void {
    if (!this.book) return;
    this.book.rating = star;
    // will call bookService.rateBook() later
    this.ratingMessage = 'Rating saved!';
    setTimeout(() => this.ratingMessage = '', 3000);
  }

  updateProgress(): void {
    if (!this.book) return;
    this.book.pagesRead = this.newPagesRead;
    this.book.progress = Math.round((this.newPagesRead / this.book.totalPages) * 100);
    // will call bookService.updatePagesRead() later
    this.progressMessage = 'Progress updated!';
    setTimeout(() => this.progressMessage = '', 3000);
  }

  deleteBook(): void {
    if (!this.book) return;
    if (confirm('Are you sure you want to delete this book?')) {
      // will call bookService.delete() later
      this.router.navigate(['/books']);
    }
  }

  goBack(): void {
    this.isOpen = false;
    setTimeout(() => this.router.navigate(['/books']), 900);
  }
}