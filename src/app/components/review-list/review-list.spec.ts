import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewList } from './review-list';

describe('ReviewList', () => {
  let component: ReviewList;
  let fixture: ComponentFixture<ReviewList>;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ReviewList]
  }).compileComponents();

  fixture = TestBed.createComponent(ReviewList);
  component = fixture.componentInstance;
  // removed detectChanges from here
});

it('should create', () => {
  fixture.detectChanges();
  expect(component).toBeTruthy();
});

it('should have empty reviews by default', () => {
  fixture.detectChanges();
  expect(component.reviews).toEqual([]);
});

it('should display reviews when provided', () => {
  component.reviews = [{ id: 1, text: 'Great book!', user: { keycloakId: 'user-1', username: 'anna' } }];
  fixture.detectChanges();
  expect(component.reviews.length).toBe(1);
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty reviews by default', () => {
    expect(component.reviews).toEqual([]);
  });

  it('should display reviews when provided', () => {
    component.reviews = [{ id: 1, text: 'Great book!', user: {keycloakId: 'user-1', username: 'anna' } }];
    fixture.detectChanges();
    expect(component.reviews.length).toBe(1);
  });
});