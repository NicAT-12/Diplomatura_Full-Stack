import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Hello Angular');
  protected readonly presentacion = signal(
    'Mi nombre es Nicolás Tissoni y quiero aprender Angular para convertirme en un programador más completo en el Front-End.'
  );
  protected readonly contador = signal(0);

  protected incrementar() {
    this.contador.update(valor => valor + 1);
  }
}