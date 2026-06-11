import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BookService } from './book.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';
import { mockKeycloakService, mockTokenService } from '../test-helpers';

describe('BookService', () => {
  let service: BookService;
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
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all books', () => {
    service.getAll().subscribe(books => {
      expect(books.length).toBe(1);
    });

    const req = httpMock.expectOne('/api/books');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, title: 'Test Book', author: 'Author' }]);
  });

  it('should get book by id', () => {
    service.getById(1).subscribe(book => {
      expect(book.title).toBe('Test Book');
    });

    const req = httpMock.expectOne('/api/books/1');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, title: 'Test Book', author: 'Author' });
  });

  it('should create a book', () => {
    const newBook = { title: 'New Book', author: 'Author', totalPages: 300, pagesRead: 0, progress: 0 };
    service.create(newBook).subscribe(book => {
      expect(book.title).toBe('New Book');
    });

    const req = httpMock.expectOne('/api/books');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 2, ...newBook });
  });

  it('should delete a book', () => {
    service.delete(1).subscribe();

    const req = httpMock.expectOne('/api/books/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});