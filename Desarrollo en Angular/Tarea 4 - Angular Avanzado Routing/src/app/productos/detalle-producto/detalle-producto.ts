import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.html',
  standalone: false,
})
export class DetalleProducto {
  private route = inject(ActivatedRoute);
  private productos = inject(ProductosService);

  // Se actualiza si el parámetro :id cambia sin recrear el componente
  private id = toSignal(this.route.paramMap.pipe(map((p) => Number(p.get('id')))));

  producto = computed(() => this.productos.obtenerPorId(this.id() ?? NaN));
}
