import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookCard } from '../../components/book-card/book-card';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loading } from '../../components/loading/loading';
import { BookSummary } from '../../interfaces/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, BookCard, Loading, ErrorMessage],
  templateUrl: './home.html',
})
export class Home {
  private readonly api = inject(BooksService);

  protected readonly estado = signal<'cargando' | 'ok' | 'error'>('cargando');
  protected readonly destacados = signal<BookSummary[]>([]);

  constructor() {
    this.cargar();
  }

  protected cargar(): void {
    this.estado.set('cargando');
    this.api.buscar('subject:classic_literature', 1, 4).subscribe({
      next: (res) => {
        this.destacados.set(res.libros);
        this.estado.set('ok');
      },
      error: () => this.estado.set('error'),
    });
  }
}
