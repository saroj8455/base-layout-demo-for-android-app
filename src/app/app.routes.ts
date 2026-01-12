import { ServiceComponent } from './pages/service/service.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: 'link1',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'link2',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
  },
  {
    path: 'link3',
    loadComponent: () =>
      import('./pages/service/service.component').then(
        (m) => m.ServiceComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  { path: '', redirectTo: 'link1', pathMatch: 'full' },
];
