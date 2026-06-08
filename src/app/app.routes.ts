import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';
import { BookList } from './components/book-list/book-list';
import { BookDetail } from './components/book-detail/book-detail';
import { BookForm } from './components/book-form/book-form';
import { FriendList } from './components/friend-list/friend-list';
import { QuizComponent } from './components/quiz/quiz';
import { Recommendations } from './components/recommendations/recommendations';
import { Admin } from './components/admin/admin';
import { FriendBookshelf } from './components/friend-bookshelf/friend-bookshelf';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList, canActivate: [authGuard] },
  { path: 'books/new', component: BookForm, canActivate: [authGuard] },
  { path: 'books/:id', component: BookDetail, canActivate: [authGuard] },
  { path: 'books/:id/edit', component: BookForm, canActivate: [adminGuard] },
  { path: 'friends', component: FriendList, canActivate: [authGuard] },
  { path: 'friends/:friendId/books', component: FriendBookshelf, canActivate: [authGuard] },
  { path: 'quiz', component: QuizComponent, canActivate: [authGuard] },
  { path: 'recommendations', component: Recommendations, canActivate: [authGuard] },
  { path: 'admin', component: Admin, canActivate: [adminGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'books' }
];