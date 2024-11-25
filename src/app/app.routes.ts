import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';

export const routes: Routes = [
  { path: '', loadComponent: () => CatalogComponent },
  { path: '**', redirectTo: '' },
];
