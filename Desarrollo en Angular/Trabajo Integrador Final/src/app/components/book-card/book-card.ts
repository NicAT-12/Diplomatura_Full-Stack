import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookSummary } from '../../interfaces/book';
import { BooksService } from '../../services/books.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-book-card',
  imports: [RouterLink],
  templateUrl: './book-card.html',
})
export class BookCard {
  readonly libro = input.required<BookSummary>();

  protected readonly favoritos = inject(FavoritesService);
  private readonly api = inject(BooksService);

  protected portada(): string | null {
    return this.api.urlPortada(this.libro().portadaId, 'M');
  }
}
