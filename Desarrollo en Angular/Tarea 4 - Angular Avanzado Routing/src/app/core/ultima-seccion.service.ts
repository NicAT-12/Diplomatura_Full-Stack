import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const CLAVE = 'ultima-seccion';
const SECCIONES = ['usuarios', 'productos'];

/** Guarda en localStorage el último módulo (sección) visitado. */
@Injectable({ providedIn: 'root' })
export class UltimaSeccionService {
  private router = inject(Router);
  private primeraNavegacion = true;

  iniciar(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.primeraNavegacion = false;
        const seccion = e.urlAfterRedirects.split('/')[1]?.split(/[?#]/)[0];
        if (seccion && SECCIONES.includes(seccion)) {
          this.guardar(seccion);
        }
      });
  }

  esPrimeraNavegacion(): boolean {
    return this.primeraNavegacion;
  }

  obtener(): string | null {
    try {
      const valor = localStorage.getItem(CLAVE);
      return valor && SECCIONES.includes(valor) ? valor : null;
    } catch {
      return null;
    }
  }

  limpiar(): void {
    try {
      localStorage.removeItem(CLAVE);
    } catch {
      /* almacenamiento no disponible */
    }
  }

  private guardar(seccion: string): void {
    try {
      localStorage.setItem(CLAVE, seccion);
    } catch {
      /* almacenamiento no disponible */
    }
  }
}
