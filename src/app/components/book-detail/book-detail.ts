import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ReviewService } from '../../services/review.service';

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
  private reviewService = inject(ReviewService);
  private cdr = inject(ChangeDetectorRef);
  private keycloak = inject(KeycloakService);

  book: Book | null = null;
  isLoading = true;
  isAdmin = false;
  isOpen = false;

  newPagesRead: number = 0;
  progressMessage = '';
  ratingMessage = '';

  reviews: any[] = [];
  newReviewText = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isAdmin = this.keycloak.isUserInRole('admin');

    this.bookService.getById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.newPagesRead = data.pagesRead ?? 0;
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

    // load reviews for this book
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