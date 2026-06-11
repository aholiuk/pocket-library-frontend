import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RecommendationService } from './recommendation.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';
import { mockKeycloakService, mockTokenService } from '../test-helpers';

describe('RecommendationService', () => {
  let service: RecommendationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    });
    service = TestBed.inject(RecommendationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get recommendations for user', () => {
    service.getForUser('user-1').subscribe(recs => {
      expect(recs.length).toBe(2);
    });

    const req = httpMock.expectOne('/api/recommendations/user-1');
    expect(req.request.method).toBe('GET');
    req.flush(['Book A', 'Book B']);
  });
});