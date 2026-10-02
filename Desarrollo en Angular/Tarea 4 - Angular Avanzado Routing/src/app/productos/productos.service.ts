import { Injectable } from '@angular/core';

import { Producto } from './producto.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Café Etiopía Guji 250 g',
      categoria: 'Café',
      precio: 9800,
      descripcion: 'Tostado claro con notas florales y de durazno.',
      detalles: ['Origen: Guji, Etiopía', 'Proceso: lavado', 'Molienda a elección'],
      stock: 24,
    },
    {
      id: 2,
      nombre: 'Café Colombia Huila 250 g',
      categoria: 'Café',
      precio: 9200,
      descripcion: 'Cuerpo medio, dulzor a caramelo y final cítrico.',
      detalles: ['Origen: Huila, Colombia', 'Proceso: lavado', 'Molienda a elección'],
      stock: 31,
    },
    {
      id: 3,
      nombre: 'Café Brasil Cerrado 1 kg',
      categoria: 'Café',
      precio: 28500,
      descripcion: 'Notas a chocolate y frutos secos, ideal para espresso.',
      detalles: ['Origen: Cerrado, Brasil', 'Proceso: natural', 'Presentación de 1 kg'],
      stock: 12,
    },
    {
      id: 4,
      nombre: 'Prensa francesa 600 ml',
      categoria: 'Accesorios',
      precio: 21000,
      descripcion: 'Jarra de vidrio borosilicato con filtro de acero inoxidable.',
      detalles: ['Capacidad: 600 ml', 'Apta para lavavajillas', 'Filtro de repuesto incluido'],
      stock: 8,
    },
    {
      id: 5,
      nombre: 'Molinillo manual',
      categoria: 'Accesorios',
      precio: 36500,
      descripcion: 'Muelas cónicas de acero con regulación de molienda.',
      detalles: ['Capacidad: 25 g', 'Ajuste por clics', 'Cuerpo de aluminio'],
      stock: 5,
    },
    {
      id: 6,
      nombre: 'Balanza con temporizador',
      categoria: 'Accesorios',
      precio: 24900,
      descripcion: 'Precisión de 0,1 g, pensada para métodos de filtrado.',
      detalles: ['Máximo: 2 kg', 'Carga por USB', 'Resistente a salpicaduras'],
      stock: 0,
    },
  ];

  obtenerTodos(): Producto[] {
    return this.productos;
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.productos.find((p) => p.id === id);
  }
}
