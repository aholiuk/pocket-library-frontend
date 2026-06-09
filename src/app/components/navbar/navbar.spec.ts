import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { TokenService } from '../../services/token.service';
import { KeycloakService } from 'keycloak-angular';
import { provideRouter } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideRouter([]),
        { provide: TokenService, useValue: mockTokenService },
        { provide: KeycloakService, useValue: mockKeycloakService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username when logged in', () => {
    expect(component.username).toBe('testuser');
  });

  it('should not be admin for regular user', () => {
    expect(component.isAdmin).toBeFalsy();
  });
});