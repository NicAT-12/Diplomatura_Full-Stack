import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, EMPTY, catchError, combineLatest, switchMap, tap } from 'rxjs';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loading } from '../../components/loading/loading';
import { BookDetail } from '../../interfaces/book';
import { BooksService } from '../../services/books.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, Loading, ErrorMessage],
  templateUrl: './book-detail.html',
})
export class BookDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(BooksService);
  protected readonly favoritos = inject(FavoritesService);

  protected readonly estado = signal<'cargando' | 'ok' | 'error'>('cargando');
  protected readonly libro = signal<BookDetail | null>(null);
  private readonly recargar$ = new BehaviorSubject<void>(undefined);

  protected readonly portada = computed(() => this.api.urlPortada(this.libro()?.portadaId ?? null, 'L'));

  constructor() {
    combineLatest([this.route.paramMap, this.recargar$])
      .pipe(
        tap(() => this.estado.set('cargando')),
        switchMap(([p]) =>
          this.api.obtenerLibro(p.get('id') ?? '').pipe(
            catchError(() => {
              this.estado.set('error');
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((libro) => {
        this.libro.set(libro);
        this.estado.set('ok');
      });
  }

  protected reintentar(): void {
    this.recargar$.next();
  }
}
