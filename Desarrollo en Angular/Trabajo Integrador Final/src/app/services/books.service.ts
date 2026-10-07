import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import {
  BookDetail,
  OpenLibraryAuthor,
  OpenLibrarySearchResponse,
  OpenLibraryWork,
  SearchResult,
} from '../interfaces/book';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://openlibrary.org';

  /** Busca libros. `consulta` usa la sintaxis de búsqueda de Open Library (ej: "subject:fantasy"). */
  buscar(consulta: string, pagina = 1, limite = 12): Observable<SearchResult> {
    return this.http
      .get<OpenLibrarySearchResponse>(`${this.baseUrl}/search.json`, {
        params: {
          q: consulta,
          page: pagina,
          limit: limite,
          fields: 'key,title,author_name,first_publish_year,cover_i',
        },
      })
      .pipe(
        map((res) => ({
          total: res.numFound,
          libros: res.docs.map((d) => ({
            id: d.key.replace('/works/', ''),
            titulo: d.title,
            autores: d.author_name ?? [],
            anio: d.first_publish_year ?? null,
            portadaId: d.cover_i ?? null,
          })),
        })),
      );
  }

  /** Obtiene un libro (work) por su ID, por ejemplo "OL45804W". */
  obtenerLibro(id: string): Observable<BookDetail> {
    return this.http.get<OpenLibraryWork>(`${this.baseUrl}/works/${id}.json`).pipe(
      switchMap((work) => {
        const claves = (work.authors ?? []).map((a) => a.author.key);
        const autores$ = claves.length
          ? forkJoin(
              claves.map((clave) =>
                this.http.get<OpenLibraryAuthor>(`${this.baseUrl}${clave}.json`).pipe(
                  map((a) => a.name),
                  catchError(() => of('')),
                ),
              ),
            ).pipe(map((nombres) => nombres.filter(Boolean)))
          : of([] as string[]);

        return autores$.pipe(
          map((autores): BookDetail => {
            const descripcion =
              typeof work.description === 'string'
                ? work.description
                : (work.description?.value ?? '');
            const anio = work.first_publish_date
              ? Number(work.first_publish_date.match(/\d{4}/)?.[0]) || null
              : null;
            return {
              id,
              titulo: work.title,
              autores,
              anio,
              portadaId: work.covers?.find((c) => c > 0) ?? null,
              descripcion,
              temas: (work.subjects ?? []).slice(0, 12),
            };
          }),
        );
      }),
    );
  }

  urlPortada(portadaId: number | null, tamanio: 'S' | 'M' | 'L' = 'M'): string | null {
    return portadaId ? `https://covers.openlibrary.org/b/id/${portadaId}-${tamanio}.jpg` : null;
  }
}
