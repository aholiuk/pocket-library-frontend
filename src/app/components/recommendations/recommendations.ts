import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  imports: [],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss'
})
export class Recommendations implements OnInit {
  private router = inject(Router);

  recommendations: string[] = [];
  isLoading = true;

  ngOnInit(): void {
    // dummy data — will be replaced with recommendationService.getForUser() later
    setTimeout(() => {
      this.recommendations = [
        'The Name of the Wind',
        'Circe',
        'The Shadow of the Wind',
        'All the Light We Cannot See',
        'The Pillars of the Earth'
      ];
      this.isLoading = false;
    }, 800); // small delay to simulate loading
  }

  goToQuiz(): void {
    this.router.navigate(['/quiz']);
  }
}