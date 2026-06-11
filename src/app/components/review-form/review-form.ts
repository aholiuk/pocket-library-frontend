import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-review-form',
  imports: [FormsModule],
  templateUrl: './review-form.html',
  styleUrl: './review-form.scss'
})
export class ReviewForm {
  @Input() bookId!: number;
  @Output() reviewPosted = new EventEmitter<Review>();

  private reviewService = inject(ReviewService);

  newReviewText = '';

  postReview(): void {
    if (!this.newReviewText.trim()) return;
    this.reviewService.create(this.bookId, this.newReviewText).subscribe({
      next: (data) => {
        this.reviewPosted.emit(data);
        this.newReviewText = '';
      },
      error: (err) => console.error('Failed to post review', err)
    });
  }
}