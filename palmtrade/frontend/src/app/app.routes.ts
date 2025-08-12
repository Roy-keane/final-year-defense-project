import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'reviews', loadComponent: () => import('./pages/reviews/reviews.component').then(m => m.ReviewsComponent) },
  { path: 'testimonials', loadComponent: () => import('./pages/testimonials/testimonials.component').then(m => m.TestimonialsComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'services/plantation-leasing', loadComponent: () => import('./pages/plantation-leasing/plantation-leasing.component').then(m => m.PlantationLeasingComponent) },
  { path: 'login', loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/auth/register.component').then(m => m.RegisterComponent) },
  { path: '**', redirectTo: '' }
];
