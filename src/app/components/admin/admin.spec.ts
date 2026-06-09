import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Admin } from './admin';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { KeycloakService } from 'keycloak-angular';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('Admin', () => {
  let component: Admin;
  let fixture: ComponentFixture<Admin>;

  const mockUserService = {
    getAll: () => of([
      { keycloakId: '1', username: 'user1' },
      { keycloakId: '2', username: 'user2' }
    ]),
    deleteUser: () => of('deleted')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Admin],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: KeycloakService, useValue: mockKeycloakService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentUserId from token', () => {
    expect(component.currentUserId).toBe('user-id');
  });

  it('should start with isLoading true', () => {
    expect(component.isLoading).toBeTruthy();
  });
});