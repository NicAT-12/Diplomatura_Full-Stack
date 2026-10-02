import { Component, inject } from '@angular/core';

import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.html',
  standalone: false,
})
export class ListaProductos {
  productos = inject(ProductosService).obtenerTodos();
}
