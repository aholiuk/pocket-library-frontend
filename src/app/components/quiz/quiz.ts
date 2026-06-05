import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class QuizComponent {
  private router = inject(Router);

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
    // will call quizService.submit() later
    console.log('Quiz submitted:', this.quiz);
    this.submitted = true;

    // navigate to recommendations after short delay
    setTimeout(() => {
      this.router.navigate(['/recommendations']);
    }, 2000);
  }
}