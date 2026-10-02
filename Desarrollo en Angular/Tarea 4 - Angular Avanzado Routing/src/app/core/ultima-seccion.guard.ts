import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UltimaSeccionService } from './ultima-seccion.service';

/**
 * Solo en la primera navegación de la sesión (al cargar o recargar la app):
 * si hay una sección guardada, redirige a ella. Después, "Inicio" funciona normal.
 */
export const redirigirAUltimaSeccion: CanActivateFn = () => {
  const ultimaSeccion = inject(UltimaSeccionService);
  const router = inject(Router);

  const guardada = ultimaSeccion.obtener();
  if (ultimaSeccion.esPrimeraNavegacion() && guardada) {
    return router.createUrlTree(['/', guardada]);
  }
  return true;
};
