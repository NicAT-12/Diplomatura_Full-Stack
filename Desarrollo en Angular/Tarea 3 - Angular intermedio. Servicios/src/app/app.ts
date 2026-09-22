import { Component } from '@angular/core';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaProductosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'tarea3-angular-servicios';
}
