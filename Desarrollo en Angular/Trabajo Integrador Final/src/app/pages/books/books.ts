import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, catchError, combineLatest, switchMap, tap } from 'rxjs';
import { BookCard } from '../../components/book-card/book-card';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loading } from '../../components/loading/loading';
import { SearchResult } from '../../interfaces/book';
import { BooksService } from '../../services/books.service';

type Estado = 'cargando' | 'ok' | 'error';

@Component({
  selector: 'app-books',
  imports: [BookCard, Loading, ErrorMessage],
  templateUrl: './books.html',
})
export class Books {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(BooksService);

  protected readonly porPagina = 12;
  protected readonly generos = [
    { valor: '', texto: 'Todos los géneros' },
    { valor: 'fantasy', texto: 'Fantasía' },
    { valor: 'science_fiction', texto: 'Ciencia ficción' },
    { valor: 'mystery', texto: 'Misterio' },
    { valor: 'romance', texto: 'Romance' },
    { valor: 'history', texto: 'Historia' },
    { valor: 'poetry', texto: 'Poesía' },
    { valor: 'horror', texto: 'Terror' },
  ];
  protected readonly ordenes = [
    { valor: 'relevancia', texto: 'Relevancia' },
    { valor: 'titulo', texto: 'Título (A-Z)' },
    { valor: 'anio-desc', texto: 'Más recientes primero' },
    { valor: 'anio-asc', texto: 'Más antiguos primero' },
  ];

  protected readonly estado = signal<Estado>('cargando');
  private readonly resultado = signal<SearchResult | null>(null);
  private readonly recargar$ = new BehaviorSubject<void>(undefined);

  // Los filtros viven en la URL (?q=...&genero=...&orden=...&pagina=...)
  private readonly params = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });
  protected readonly q = computed(() => this.params().get('q') ?? '');
  protected readonly genero = computed(() => this.params().get('genero') ?? '');
  protected readonly orden = computed(() => this.params().get('orden') ?? 'relevancia');
  protected readonly pagina = computed(() => Math.max(1, Number(this.params().get('pagina')) || 1));

  protected readonly texto = signal(this.route.snapshot.queryParamMap.get('q') ?? '');

  protected readonly total = computed(() => this.resultado()?.total ?? 0);
  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.porPagina)),
  );

  /** Ordena los resultados de la página actual. */
  protected readonly libros = computed(() => {
    const lista = [...(this.resultado()?.libros ?? [])];
    switch (this.orden()) {
      case 'titulo':
        return lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
      case 'anio-desc':
        return lista.sort((a, b) => (b.anio ?? -Infinity) - (a.anio ?? -Infinity));
      case 'anio-asc':
        return lista.sort((a, b) => (a.anio ?? Infinity) - (b.anio ?? Infinity));
      default:
        return lista;
    }
  });

  constructor() {
    combineLatest([this.route.queryParamMap, this.recargar$])
      .pipe(
        tap(() => this.estado.set('cargando')),
        switchMap(([p]) =>
          this.api.buscar(this.armarConsulta(p), Math.max(1, Number(p.get('pagina')) || 1), this.porPagina).pipe(
            catchError(() => {
              this.estado.set('error');
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((res) => {
        this.resultado.set(res);
        this.estado.set('ok');
      });
  }

  private armarConsulta(p: ParamMap): string {
    const q = (p.get('q') ?? '').trim();
    const genero = p.get('genero') ?? '';
    if (q && genero) return `${q} subject:${genero}`;
    if (q) return q;
    if (genero) return `subject:${genero}`;
    return 'subject:fiction';
  }

  protected buscar(): void {
    this.navegar({ q: this.texto().trim() || null, pagina: null });
  }

  protected cambiarGenero(valor: string): void {
    this.navegar({ genero: valor || null, pagina: null });
  }

  protected cambiarOrden(valor: string): void {
    this.navegar({ orden: valor === 'relevancia' ? null : valor });
  }

  protected irAPagina(n: number): void {
    this.navegar({ pagina: n > 1 ? n : null });
  }

  protected limpiar(): void {
    this.texto.set('');
    this.router.navigate([], { queryParams: {} });
  }

  protected reintentar(): void {
    this.recargar$.next();
  }

  private navegar(cambios: Record<string, string | number | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: cambios,
      queryParamsHandling: 'merge',
    });
  }
}
