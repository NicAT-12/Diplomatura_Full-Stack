import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  protected readonly favoritos = inject(FavoritesService);
  protected readonly menuAbierto = signal(false);

  protected readonly enlaces = [
    { ruta: '/', texto: 'Inicio', exacto: true },
    { ruta: '/libros', texto: 'Libros', exacto: false },
    { ruta: '/nosotros', texto: 'Nosotros', exacto: false },
    { ruta: '/contacto', texto: 'Contacto', exacto: false },
  ];

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
