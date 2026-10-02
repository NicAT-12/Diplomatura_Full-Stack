import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Inicio } from './inicio/inicio';
import { NoEncontrado } from './no-encontrado/no-encontrado';

registerLocaleData(localeEsAr, 'es-AR');

@NgModule({
  declarations: [App, Inicio, NoEncontrado],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [App],
})
export class AppModule {}
