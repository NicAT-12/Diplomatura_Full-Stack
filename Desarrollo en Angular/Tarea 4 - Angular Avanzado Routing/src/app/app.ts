import { Component, inject } from '@angular/core';

import { UltimaSeccionService } from './core/ultima-seccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
})
export class App {
  constructor() {
    // Empieza a registrar cada navegación para recordar la última sección
    inject(UltimaSeccionService).iniciar();
  }
}
