import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

// Import all your components
import { BookList } from './components/book-list/book-list';
import { BookDetail } from './components/book-detail/book-detail';
import { BookForm } from './components/book-form/book-form';
import { FriendList } from './components/friend-list/friend-list';
import { Quiz } from './components/quiz/quiz';
import { Recommendations } from './components/recommendations/recommendations';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  // Default route → redirect to books
  { path: '', redirectTo: 'books', pathMatch: 'full' },

  // Books — any logged in user
  { path: 'books', component: BookList, canActivate: [authGuard] },

  // Book detail — any logged in user
  { path: 'books/:id', component: BookDetail, canActivate: [authGuard] },

  // Book form — admin only (create and edit use same component)
  { path: 'books/new', component: BookForm, canActivate: [adminGuard] },
  { path: 'books/:id/edit', component: BookForm, canActivate: [adminGuard] },

  // Friends — any logged in user
  { path: 'friends', component: FriendList, canActivate: [authGuard] },

  // Quiz — any logged in user
  { path: 'quiz', component: Quiz, canActivate: [authGuard] },

  // Recommendations — any logged in user
  { path: 'recommendations', component: Recommendations, canActivate: [authGuard] },

  // Admin — admin only
  { path: 'admin', component: Admin, canActivate: [adminGuard] },

  // Catch all unknown routes → back to books
  { path: '**', redirectTo: 'books' }
];