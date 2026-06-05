import { Routes } from '@angular/router';

import { BookList } from './components/book-list/book-list';
import { BookDetail } from './components/book-detail/book-detail';
import { BookForm } from './components/book-form/book-form';
import { FriendList } from './components/friend-list/friend-list';
import { QuizComponent } from './components/quiz/quiz';
import { Recommendations } from './components/recommendations/recommendations';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList },
  { path: 'books/new', component: BookForm },
  { path: 'books/:id', component: BookDetail },
  { path: 'books/:id/edit', component: BookForm },
  { path: 'friends', component: FriendList },
  { path: 'quiz', component: QuizComponent },
  { path: 'recommendations', component: Recommendations },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: 'books' }
];