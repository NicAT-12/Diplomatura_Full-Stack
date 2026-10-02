import { Component } from '@angular/core';

interface Usuario {
  id: number;
  nombre: string;
  rol: string;
  email: string;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.html',
  standalone: false,
})
export class ListaUsuarios {
  usuarios: Usuario[] = [
    { id: 1, nombre: 'Lucía Fernández', rol: 'Barista', email: 'lucia@granero.test' },
    { id: 2, nombre: 'Martín Sosa', rol: 'Tostador', email: 'martin@granero.test' },
    { id: 3, nombre: 'Camila Ríos', rol: 'Atención al cliente', email: 'camila@granero.test' },
    { id: 4, nombre: 'Julián Paz', rol: 'Logística', email: 'julian@granero.test' },
  ];
}
