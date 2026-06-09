export interface Book {
  id?: number;
  title: string;
  author: string;
  totalPages: number;
  pagesRead?: number;
  progress?: number;
  rating?: number;
  keycloakId?: string;
}