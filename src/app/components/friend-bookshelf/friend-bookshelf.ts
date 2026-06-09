import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-friend-bookshelf',
  imports: [FormsModule],
  templateUrl: './friend-bookshelf.html',
  styleUrl: './friend-bookshelf.scss'
})
export class FriendBookshelf implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bookService = inject(BookService);
  private reviewService = inject(ReviewService);
  private cdr = inject(ChangeDetectorRef);

  books: Book[] = [];
  isLoading = true;
  friendId = '';
  friendUsername = '';

  // modal
  selectedBook: Book | null = null;
  reviews: any[] = [];
  newReviewText = '';
  reviewSuccess = '';
  reviewError = '';

  spineColors = [
    '#356789', '#655D21', '#A07B5F', '#B2DBAF',
    '#652121', '#214365', '#51361A', '#216565'
  ];
  spineHeights = [160, 180, 195, 170];
  hoveredBookId: number | null = null;

  ngOnInit(): void {
    this.friendId = this.route.snapshot.paramMap.get('friendId') ?? '';
    this.friendUsername = this.route.snapshot.queryParamMap.get('username') ?? 'Friend';

    setTimeout(() => {
      this.bookService.getByUser(this.friendId).subscribe({
        next: (data) => {
          this.books = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load friend bookshelf', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }, 500);
  }

  openBook(book: Book): void {
    this.selectedBook = book;
    this.newReviewText = '';
    this.reviewSuccess = '';
    this.reviewError = '';
    this.reviews = [];

    this.reviewService.getByBook(book.id!).subscribe({
      next: (data) => {
        this.reviews = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load reviews', err)
    });
  }

  closeModal(): void {
    this.selectedBook = null;
    this.reviews = [];
    this.newReviewText = '';
  }

  postReview(): void {
    if (!this.selectedBook || !this.newReviewText.trim()) return;

    this.reviewService.create(this.selectedBook.id!, this.newReviewText).subscribe({
      next: (data) => {
        this.reviews.push(data);
        this.newReviewText = '';
        this.reviewSuccess = 'Review posted!';
        setTimeout(() => this.reviewSuccess = '', 3000);
        this.cdr.detectChanges();
      },
      error: () => {
        this.reviewError = 'Failed to post review.';
        setTimeout(() => this.reviewError = '', 3000);
      }
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

  goBack(): void {
    this.router.navigate(['/friends']);
  }
}