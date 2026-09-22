import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private productos: Producto[] = [
    { id: 1, nombre: 'Teclado mecánico', precio: 45000, fechaAlta: new Date('2026-05-10') },
    { id: 2, nombre: 'Mouse inalámbrico', precio: 18000, fechaAlta: new Date('2026-06-02') },
    { id: 3, nombre: 'Monitor 24"', precio: 150000, fechaAlta: new Date('2026-07-15') },
  ];

  constructor() { }

  getProductos(): Producto[] {
    return this.productos;
  }

  addProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  deleteProducto(id: number): void {
    this.productos = this.productos.filter(p => p.id !== id);
  }
}
