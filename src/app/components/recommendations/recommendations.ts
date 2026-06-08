import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendationService } from '../../services/recommendation.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-recommendations',
  imports: [],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss'
})
export class Recommendations implements OnInit {
  private router = inject(Router);
  private recommendationService = inject(RecommendationService);
  private keycloak = inject(KeycloakService);
  private cdr = inject(ChangeDetectorRef);

  recommendations: string[] = [];
  isLoading = true;

  ngOnInit(): void {
    const token = this.keycloak.getKeycloakInstance().tokenParsed;
    const userId = token?.['sub'] ?? '';

    setTimeout(() => {
      this.recommendationService.getForUser(userId).subscribe({
        next: (data) => {
          this.recommendations = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load recommendations', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    }, 500);
  }

  goToQuiz(): void {
    this.router.navigate(['/quiz']);
  }
}