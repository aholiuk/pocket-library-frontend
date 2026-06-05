import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class QuizComponent {
  private router = inject(Router);
  private quizService = inject(QuizService);
  private keycloak = inject(KeycloakService);

  submitted = false;
  errorMessage = '';

  // the quiz form data matching our Quiz model
  quiz: Quiz = {
    userId: 'user-1', // will come from Keycloak later
    lastBookRead: '',
    likedLastBook: false,
    favoriteGenre: ''
  };

  genres = [
    'Fantasy', 'Science Fiction', 'Mystery',
    'Romance', 'Historical Fiction', 'Horror',
    'Literary Fiction', 'Thriller', 'Biography'
  ];

  submit(): void {
    if (!this.quiz.lastBookRead.trim()) {
      this.errorMessage = 'Please enter the last book you read.';
      return;
    }
    if (!this.quiz.favoriteGenre) {
      this.errorMessage = 'Please select your favorite genre.';
      return;
    }

    this.errorMessage = '';
    // get userId from Keycloak token
    const token = this.keycloak.getKeycloakInstance().tokenParsed;
    this.quiz.userId = token?.['sub'] ?? '';

    this.quizService.submit(this.quiz).subscribe({
      next: () => {
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/recommendations']), 2000);
      },
      error: () => {
        this.errorMessage = 'Failed to submit quiz. Please try again.';
      }
    });
  }
}