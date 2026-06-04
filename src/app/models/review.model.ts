import { User } from './user.model';
import { Book } from './book.model';

export interface Review {
  id?: number;
  text: string;
  user?: User;
  book?: Book;
}