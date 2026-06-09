import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  const mockAuthService = {
    register: () => of('User created'),
    login: () => of({ access_token: 'token', refresh_token: 'refresh' })
  };

  const mockTokenService = {
    setTokens: () => {},
    getToken: () => null,
    isAuthenticated: () => false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when fields are empty', () => {
    component.register();
    expect(component.errorMessage).toBe('Please fill in all fields.');
  });

  it('should show error when username is too short', () => {
    component.username = 'ab';
    component.email = 'test@test.com';
    component.password = 'password';
    component.firstName = 'Test';
    component.lastName = 'User';
    component.register();
    expect(component.errorMessage).toBe('Username must be at least 3 characters.');
  });
});