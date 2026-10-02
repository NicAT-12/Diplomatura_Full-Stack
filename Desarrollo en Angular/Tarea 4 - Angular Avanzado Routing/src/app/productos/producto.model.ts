export interface Producto {
  id: number;
  nombre: string;
  categoria: 'Café' | 'Accesorios';
  precio: number;
  descripcion: string;
  detalles: string[];
  stock: number;
}
