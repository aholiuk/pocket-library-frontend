import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-detail',
  imports: [FormsModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);  // reads the :id from the URL
  private router = inject(Router);
  private bookService = inject(BookService);

  book: Book | null = null;
  isLoading = true;
  isAdmin = true;

  // for updating pages read
  newPagesRead: number = 0;

  // for rating
  newRating: number = 0;

  // feedback messages
  progressMessage = '';
  ratingMessage = '';

  ngOnInit(): void {
    // get the id from the URL — e.g. /books/3 gives us id = 3
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // dummy data for now — will be replaced with bookService.getById(id)
    this.book = {
      id: id,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 90,
      progress: 50,
      rating: 8
    };
    this.newPagesRead = this.book.pagesRead ?? 0;
    this.newRating = this.book.rating ?? 0;
    this.isLoading = false;
  }

  // update reading progress
  updateProgress(): void {
    if (!this.book) return;
    // will call bookService.updatePagesRead() later
    this.book.pagesRead = this.newPagesRead;
    this.book.progress = Math.round((this.newPagesRead / this.book.totalPages) * 100);
    this.progressMessage = 'Progress updated!';
    setTimeout(() => this.progressMessage = '', 3000);
  }

  // rate the book
  rateBook(): void {
    if (!this.book) return;
    // will call bookService.rateBook() later
    this.book.rating = this.newRating;
    this.ratingMessage = 'Rating saved!';
    setTimeout(() => this.ratingMessage = '', 3000);
  }

  // delete book — admin only
  deleteBook(): void {
    if (!this.book) return;
    if (confirm('Are you sure you want to delete this book?')) {
      // will call bookService.delete() later
      this.router.navigate(['/books']);
    }
  }

  // go back to book list
  goBack(): void {
    this.router.navigate(['/books']);
  }
}