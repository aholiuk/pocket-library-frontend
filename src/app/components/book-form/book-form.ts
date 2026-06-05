import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  imports: [FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss'
})
export class BookForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);

  // is this create or edit mode?
  isEditMode = false;
  bookId: number | null = null;
  isLoading = false;
  errorMessage = '';

  // the form data
  book: Book = {
    title: '',
    author: '',
    totalPages: 0,
  };

  private dummyBooks: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', totalPages: 180 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', totalPages: 281 },
    { id: 3, title: '1984', author: 'George Orwell', totalPages: 328 },
    { id: 4, title: 'Dune', author: 'Frank Herbert', totalPages: 412 },
    { id: 5, title: 'Brave New World', author: 'Aldous Huxley', totalPages: 311 },
    { id: 6, title: 'Jane Eyre', author: 'Charlotte Brontë', totalPages: 500 },
  ];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam && idParam !== 'new') {
      this.isEditMode = true;
      this.bookId = Number(idParam);

      this.bookService.getById(this.bookId).subscribe({
        next: (data) => this.book = { ...data },
        error: (err) => console.error('Failed to load book', err)
      });
    }
  }

  save(): void {
    if (!this.book.title.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }
    if (!this.book.author.trim()) {
      this.errorMessage = 'Author is required.';
      return;
    }
    if (!this.book.totalPages || this.book.totalPages < 1) {
      this.errorMessage = 'Total pages must be at least 1.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    if (this.isEditMode && this.bookId) {
      this.bookService.update(this.bookId, this.book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => {
          this.errorMessage = 'Failed to update book.';
          this.isLoading = false;
        }
      });
    } else {
      this.bookService.create(this.book).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => {
          this.errorMessage = 'Failed to create book.';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}