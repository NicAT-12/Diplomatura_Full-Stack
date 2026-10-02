import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetalleProducto } from './detalle-producto/detalle-producto';
import { ListaProductos } from './lista-productos/lista-productos';

const routes: Routes = [
  { path: '', component: ListaProductos, title: 'Productos' },
  // Ruta dinámica: /productos/1, /productos/2, ...
  { path: ':id', component: DetalleProducto, title: 'Detalle del producto' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
