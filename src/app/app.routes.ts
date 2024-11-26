import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [
  { path: '', loadComponent: () => CatalogComponent },
  { path: 'cart', loadComponent: () => CartComponent },
  { path: '**', redirectTo: '' },
];
