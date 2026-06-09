import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz';
import { QuizService } from '../../services/quiz.service';
import { KeycloakService } from 'keycloak-angular';
import { TokenService } from '../../services/token.service';
import { provideRouter } from '@angular/router';
import { mockKeycloakService, mockTokenService } from '../../test-helpers';
import { of } from 'rxjs';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  const mockQuizService = {
    submit: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        provideRouter([]),
        { provide: QuizService, useValue: mockQuizService },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error when last book is empty', () => {
    component.quiz.lastBookRead = '';
    component.submit();
    expect(component.errorMessage).toBe('Please enter the last book you read.');
  });

  it('should show error when genre is not selected', () => {
    component.quiz.lastBookRead = 'Harry Potter';
    component.quiz.favoriteGenre = '';
    component.submit();
    expect(component.errorMessage).toBe('Please select your favorite genre.');
  });
});