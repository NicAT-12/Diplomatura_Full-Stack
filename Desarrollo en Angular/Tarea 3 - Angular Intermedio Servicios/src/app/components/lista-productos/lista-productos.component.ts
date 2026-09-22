import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { DescuentoPipe } from '../../pipes/descuento.pipe';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, DescuentoPipe],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[] = [];
  porcentajeDescuento: number = 10;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

  eliminarProducto(id: number): void {
    this.productoService.deleteProducto(id);
    this.productos = this.productoService.getProductos();
  }

  agregarProductoSimulado(): void {
    const nuevoId = this.productos.length > 0
      ? Math.max(...this.productos.map(p => p.id)) + 1
      : 1;

    const nuevoProducto: Producto = {
      id: nuevoId,
      nombre: `Producto nuevo ${nuevoId}`,
      precio: Math.floor(Math.random() * 50000) + 5000,
      fechaAlta: new Date()
    };

    this.productoService.addProducto(nuevoProducto);
    this.productos = this.productoService.getProductos();
  }
}
