import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListaUsuarios } from './lista-usuarios/lista-usuarios';
import { UsuariosRoutingModule } from './usuarios-routing-module';

@NgModule({
  declarations: [ListaUsuarios],
  imports: [CommonModule, UsuariosRoutingModule],
})
export class UsuariosModule {}
