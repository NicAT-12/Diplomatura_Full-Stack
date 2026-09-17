import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registro } from './registro/registro';

@Component({
  imports: [RouterOutlet, Registro],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('directivas-formularios');
}
