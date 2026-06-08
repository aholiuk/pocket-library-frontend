import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendBookshelf } from './friend-bookshelf';

describe('FriendBookshelf', () => {
  let component: FriendBookshelf;
  let fixture: ComponentFixture<FriendBookshelf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendBookshelf],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendBookshelf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
