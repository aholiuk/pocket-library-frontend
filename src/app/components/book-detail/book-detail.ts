import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-book-detail',
  imports: [FormsModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss'
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private reviewService = inject(ReviewService);
  private tokenService = inject(TokenService);
  private cdr = inject(ChangeDetectorRef);

  book: Book | null = null;
  isLoading = true;
  isOwner = false;
  isOpen = false;

  newPagesRead: number = 0;
  progressMessage = '';
  ratingMessage = '';
  reviews: any[] = [];
  newReviewText = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const currentUserId = this.tokenService.getParsedToken()?.sub ?? '';

    this.bookService.getById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.newPagesRead = data.pagesRead ?? 0;
        this.isOwner = data.keycloakId === currentUserId;
        this.isLoading = false;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.isOpen = true;
          this.cdr.detectChanges();
        }, 50);
      },
      error: (err) => {
        console.error('Failed to load book', err);
        this.isLoading = false;
      }
    });

    this.reviewService.getByBook(id).subscribe({
      next: (data) => this.reviews = data,
      error: (err) => console.error('Failed to load reviews', err)
    });
  }

  getStars(): number[] {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  setRating(star: number): void {
    if (!this.book) return;
    this.bookService.rateBook(this.book.id!, star).subscribe({
      next: (data) => {
        this.book = data;
        this.ratingMessage = 'Rating saved!';
        setTimeout(() => this.ratingMessage = '', 3000);
      },
      error: () => this.ratingMessage = 'Failed to save rating.'
    });
  }

  updateProgress(): void {
    if (!this.book) return;
    this.bookService.updatePagesRead(this.book.id!, this.newPagesRead).subscribe({
      next: (data) => {
        this.book = data;
        this.progressMessage = 'Progress updated!';
        setTimeout(() => this.progressMessage = '', 3000);
      },
      error: () => this.progressMessage = 'Failed to update progress.'
    });
  }

  postReview(): void {
    if (!this.book || !this.newReviewText.trim()) return;
    this.reviewService.create(this.book.id!, this.newReviewText).subscribe({
      next: (data) => {
        this.reviews.push(data);
        this.newReviewText = '';
      },
      error: (err) => console.error('Failed to post review', err)
    });
  }

  deleteBook(): void {
    if (!this.book) return;
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(this.book.id!).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Failed to delete book.')
      });
    }
  }

  goBack(): void {
    this.isOpen = false;
    this.cdr.detectChanges();
    setTimeout(() => this.router.navigate(['/books']), 900);
  }
}