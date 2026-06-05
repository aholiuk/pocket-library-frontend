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
    // check if we are in edit mode by looking at the URL
    // /books/new → create mode
    // /books/3/edit → edit mode
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam && idParam !== 'new') {
      this.isEditMode = true;
      this.bookId = Number(idParam);
      // load existing book data — will use bookService.getById() later
      const existing = this.dummyBooks.find(b => b.id === this.bookId);
      if (existing) {
        this.book = { ...existing }; // spread to avoid mutating the original
      }
    }
  }

  save(): void {
    // basic validation
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

    if (this.isEditMode && this.bookId) {
      // will call bookService.update() later
      console.log('Updating book:', this.book);
    } else {
      // will call bookService.create() later
      console.log('Creating book:', this.book);
    }

    // navigate back to book list after save
    this.router.navigate(['/books']);
  }

  cancel(): void {
    this.router.navigate(['/books']);
  }
}