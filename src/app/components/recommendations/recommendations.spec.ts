import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recommendations } from './recommendations';
import { RecommendationService } from '../../services/recommendation.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('Recommendations', () => {
  let component: Recommendations;
  let fixture: ComponentFixture<Recommendations>;

  const mockRecommendationService = {
    getForUser: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recommendations],
      providers: [
        provideRouter([]),
        { provide: RecommendationService, useValue: mockRecommendationService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Recommendations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty recommendations initially', () => {
    expect(component.recommendations).toEqual([]);
  });
});