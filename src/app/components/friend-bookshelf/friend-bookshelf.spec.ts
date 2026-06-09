import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendBookshelf } from './friend-bookshelf';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('FriendBookshelf', () => {
  let component: FriendBookshelf;
  let fixture: ComponentFixture<FriendBookshelf>;

  const mockBookService = {
    getByUser: () => of([])
  };

  const mockReviewService = {
    getByBook: () => of([]),
    create: () => of({})
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: { get: () => 'friend-id' },
      queryParamMap: { get: () => 'Friend' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendBookshelf],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: mockBookService },
        { provide: ReviewService, useValue: mockReviewService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendBookshelf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty books list initially', () => {
    expect(component.books).toEqual([]);
  });
});