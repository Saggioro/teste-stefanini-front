import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderFormComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
