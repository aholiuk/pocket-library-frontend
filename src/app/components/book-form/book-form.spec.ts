import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookForm } from './book-form';
import { BookService } from '../../services/book.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('BookForm', () => {
  let component: BookForm;
  let fixture: ComponentFixture<BookForm>;

  const mockBookService = {
    getById: () => of({}),
    create: () => of({}),
    update: () => of({})
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: { get: () => null },
      url: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookForm],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: mockBookService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});