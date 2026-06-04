import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookList implements OnInit {
  private bookService = inject(BookService);

  books: Book[] = [];
  isLoading = true;
  isAdmin = true;

  ngOnInit(): void {
    // this.bookService.getAll().subscribe({
    //   next: (data) => {
    //     this.books = data;
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     console.error('Failed to load books', err);
    //     this.isLoading = false;
    //   }
    // });
     this.books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      totalPages: 180,
      pagesRead: 90,
      progress: 50,
      rating: 8
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      totalPages: 281,
      pagesRead: 281,
      progress: 100,
      rating: 9
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      totalPages: 328,
      pagesRead: 50,
      progress: 15,
      rating: 4
    }
  ];
  this.isLoading = false;
  }
}