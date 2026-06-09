import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetail } from './book-detail';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('BookDetail', () => {
  let component: BookDetail;
  let fixture: ComponentFixture<BookDetail>;

  const mockBookService = {
    getById: () => of({ id: 1, title: 'Test', author: 'Author', totalPages: 100, pagesRead: 0, progress: 0, keycloakId: 'user-id' }),
    updatePagesRead: () => of({}),
    rateBook: () => of({}),
    delete: () => of({})
  };

  const mockReviewService = {
    getByBook: () => of([]),
    create: () => of({})
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: { get: () => '1' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetail],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: mockBookService },
        { provide: ReviewService, useValue: mockReviewService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load book on init', () => {
    expect(component.book).toBeTruthy();
  });
});