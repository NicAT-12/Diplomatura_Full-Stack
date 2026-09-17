import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class Registro {
  private fb = inject(FormBuilder);
  enviado = false;

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: [''],
  });

  handleSubmit() {
    console.log(this.formulario.value);
    this.formulario.reset();
    this.enviado = true;
  }

  obtenerErrores(campo: string) {
    const control = this.formulario.get(campo);
    if (!control?.touched) {
      return [];
    }
    return Object.keys(control?.errors || {});
  }

  obtenerMensajeError(error: string) {
    switch (error) {
      case 'required':
        return 'Este campo es obligatorio';
      case 'minlength':
        return 'Debe tener al menos 3 caracteres';
      case 'email':
        return 'El formato del email no es válido';
      default:
        return 'Campo inválido';
    }
  }
}
