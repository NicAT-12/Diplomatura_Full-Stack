import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetalleProducto } from './detalle-producto/detalle-producto';
import { ListaProductos } from './lista-productos/lista-productos';
import { ProductosRoutingModule } from './productos-routing-module';

@NgModule({
  declarations: [ListaProductos, DetalleProducto],
  imports: [CommonModule, ProductosRoutingModule],
})
export class ProductosModule {}
