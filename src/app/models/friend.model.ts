import { User } from './user.model';

export interface Friend {
  id?: number;
  user?: User;
  friend?: User;
}