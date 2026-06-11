import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';
import { mockKeycloakService, mockTokenService } from '../test-helpers';

describe('UserService', () => {
  let service: UserService;
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
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getAll().subscribe(users => {
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush([{ keycloakId: '1', username: 'anna' }, { keycloakId: '2', username: 'user2' }]);
  });

  it('should get current user', () => {
    service.getMe().subscribe(user => {
      expect(user.username).toBe('anna');
    });

    const req = httpMock.expectOne('/api/users/me');
    expect(req.request.method).toBe('GET');
    req.flush({ keycloakId: '1', username: 'anna' });
  });

  it('should delete a user', () => {
    service.deleteUser('user-1').subscribe();

    const req = httpMock.expectOne('/api/users/user-1');
    expect(req.request.method).toBe('DELETE');
    req.flush('Deleted');
  });
});