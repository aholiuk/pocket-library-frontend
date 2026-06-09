import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendList } from './friend-list';
import { FriendService } from '../../services/friend.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('FriendList', () => {
  let component: FriendList;
  let fixture: ComponentFixture<FriendList>;

  const mockFriendService = {
    getAll: () => of([]),
    searchByUsername: () => of({}),
    addFriend: () => of('added'),
    deleteFriend: () => of('deleted')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendList],
      providers: [
        provideRouter([]),
        { provide: FriendService, useValue: mockFriendService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty friends list initially', () => {
    expect(component.friends).toEqual([]);
  });
});