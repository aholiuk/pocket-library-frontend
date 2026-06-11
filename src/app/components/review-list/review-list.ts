import { Component, Input } from '@angular/core';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-review-list',
  imports: [],
  templateUrl: './review-list.html',
  styleUrl: './review-list.scss'
})
export class ReviewList {
  @Input() reviews: Review[] = [];
}