import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login endpoint', () => {
    service.login('anna', 'password').subscribe(res => {
      expect(res.access_token).toBe('token123');
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'anna', password: 'password' });
    req.flush({ access_token: 'token123', refresh_token: 'refresh123' });
  });

  it('should call register endpoint', () => {
    const data = { username: 'anna', email: 'anna@test.com', password: 'pass', firstName: 'Anna', lastName: 'H' };
    service.register(data).subscribe(res => {
      expect(res).toBe('User created');
    });

    const req = httpMock.expectOne('/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush('User created');
  });
});