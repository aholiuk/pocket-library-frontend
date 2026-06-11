import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FriendService } from './friend.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from './token.service';
import { mockKeycloakService, mockTokenService } from '../test-helpers';

describe('FriendService', () => {
  let service: FriendService;
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
    service = TestBed.inject(FriendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all friends', () => {
    service.getAll().subscribe(friends => {
      expect(friends.length).toBe(1);
    });

    const req = httpMock.expectOne('/api/friends');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, userKeycloakId: 'user-1', friendKeycloakId: 'user-2' }]);
  });

  it('should search by username', () => {
    service.searchByUsername('anna').subscribe(user => {
      expect(user.username).toBe('anna');
    });

    const req = httpMock.expectOne('/api/friends/search?username=anna');
    expect(req.request.method).toBe('GET');
    req.flush({ keycloakId: 'user-1', username: 'anna' });
  });

  it('should add a friend', () => {
    service.addFriend('user-2').subscribe(res => {
      expect(res).toBe('Friend added');
    });

    const req = httpMock.expectOne('/api/friends/user-2');
    expect(req.request.method).toBe('POST');
    req.flush('Friend added');
  });

  it('should delete a friend', () => {
    service.deleteFriend(1).subscribe();

    const req = httpMock.expectOne('/api/friends/1');
    expect(req.request.method).toBe('DELETE');
    req.flush('Deleted');
  });
});