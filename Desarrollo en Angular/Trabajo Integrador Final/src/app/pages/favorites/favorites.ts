import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookCard } from '../../components/book-card/book-card';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, BookCard],
  templateUrl: './favorites.html',
})
export class Favorites {
  protected readonly favoritos = inject(FavoritesService);
}
