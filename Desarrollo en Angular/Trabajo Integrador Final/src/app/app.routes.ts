import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { BookDetailPage } from './pages/book-detail/book-detail';
import { Books } from './pages/books/books';
import { Contact } from './pages/contact/contact';
import { Favorites } from './pages/favorites/favorites';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'Biblioteca Abierta | Inicio' },
  { path: 'libros', component: Books, title: 'Biblioteca Abierta | Libros' },
  { path: 'libros/:id', component: BookDetailPage, title: 'Biblioteca Abierta | Detalle' },
  { path: 'favoritos', component: Favorites, title: 'Biblioteca Abierta | Favoritos' },
  { path: 'nosotros', component: About, title: 'Biblioteca Abierta | Nosotros' },
  { path: 'contacto', component: Contact, title: 'Biblioteca Abierta | Contacto' },
  { path: '**', component: NotFound, title: 'Biblioteca Abierta | Página no encontrada' },
];
