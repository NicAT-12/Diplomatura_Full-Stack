import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirigirAUltimaSeccion } from './core/ultima-seccion.guard';
import { Inicio } from './inicio/inicio';
import { NoEncontrado } from './no-encontrado/no-encontrado';

const routes: Routes = [
  {
    path: '',
    component: Inicio,
    pathMatch: 'full',
    title: 'Inicio',
    // Al abrir la app en "/", redirige a la última sección guardada
    canActivate: [redirigirAUltimaSeccion],
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios-module').then((m) => m.UsuariosModule),
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos-module').then((m) => m.ProductosModule),
  },
  { path: '**', component: NoEncontrado, title: 'Página no encontrada' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
