import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookList } from './book-list';
import { BookService } from '../../services/book.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;

  const mockBookService = {
    getAll: () => of([]),
    getByUser: () => of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [
        provideRouter([]),
        { provide: BookService, useValue: mockBookService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookList);
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