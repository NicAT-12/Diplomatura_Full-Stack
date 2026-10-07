import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.html',
})
export class ErrorMessage {
  readonly mensaje = input('No pudimos cargar la información. Intentá nuevamente.');
  readonly reintentar = output<void>();
}
