import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.html',
})
export class Loading {
  readonly mensaje = input('Cargando...');
}
