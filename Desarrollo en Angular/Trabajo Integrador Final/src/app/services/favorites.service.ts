import { Injectable, computed, effect, signal } from '@angular/core';
import { BookSummary } from '../interfaces/book';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly clave = 'biblioteca-abierta:favoritos';

  readonly favoritos = signal<BookSummary[]>(this.cargar());
  readonly cantidad = computed(() => this.favoritos().length);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(this.clave, JSON.stringify(this.favoritos()));
      } catch {
        // localStorage no disponible: los favoritos viven solo en memoria.
      }
    });
  }

  esFavorito(id: string): boolean {
    return this.favoritos().some((l) => l.id === id);
  }

  alternar(libro: BookSummary): void {
    this.favoritos.update((lista) =>
      lista.some((l) => l.id === libro.id)
        ? lista.filter((l) => l.id !== libro.id)
        : [...lista, libro],
    );
  }

  private cargar(): BookSummary[] {
    try {
      const guardado = localStorage.getItem(this.clave);
      return guardado ? (JSON.parse(guardado) as BookSummary[]) : [];
    } catch {
      return [];
    }
  }
}
