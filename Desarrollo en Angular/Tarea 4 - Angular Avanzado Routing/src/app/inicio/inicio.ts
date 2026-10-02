import { Component, inject } from '@angular/core';

import { UltimaSeccionService } from '../core/ultima-seccion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.html',
  standalone: false,
})
export class Inicio {
  private ultimaSeccion = inject(UltimaSeccionService);

  guardada = this.ultimaSeccion.obtener();

  olvidar(): void {
    this.ultimaSeccion.limpiar();
    this.guardada = null;
  }
}
