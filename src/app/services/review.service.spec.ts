import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReviewService } from './review.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';
import { mockKeycloakService, mockTokenService } from '../test-helpers';

describe('ReviewService', () => {
  let service: ReviewService;
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
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get reviews by book', () => {
    service.getByBook(1).subscribe(reviews => {
      expect(reviews.length).toBe(1);
    });

    const req = httpMock.expectOne('/api/reviews/book/1');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, text: 'Great book!' }]);
  });

  it('should create a review', () => {
    service.create(1, 'Great book!').subscribe(review => {
      expect(review.text).toBe('Great book!');
    });

    const req = httpMock.expectOne('/api/reviews?bookId=1');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 1, text: 'Great book!' });
  });
});