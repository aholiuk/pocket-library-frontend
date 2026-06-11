import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewForm } from './review-form';
import { ReviewService } from '../../services/review.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('ReviewForm', () => {
  let component: ReviewForm;
  let fixture: ComponentFixture<ReviewForm>;

  const mockReviewService = {
    create: () => of({ id: 1, text: 'Great!' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewForm],
      providers: [
        { provide: ReviewService, useValue: mockReviewService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewForm);
    component = fixture.componentInstance;
    component.bookId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});