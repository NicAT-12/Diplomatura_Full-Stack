import { Component } from '@angular/core';

@Component({
  selector: 'app-no-encontrado',
  standalone: false,
  template: `
    <section>
      <h1 class="text-3xl font-bold">Esta página no existe</h1>
      <p class="mt-3 text-tinta/80">Revisá la dirección o volvé al inicio.</p>
      <a routerLink="/" class="mt-6 inline-block text-marca underline">Volver al inicio</a>
    </section>
  `,
})
export class NoEncontrado {}
