import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { EquipmentDetailsComponent } from './pages/equipments/equipment-details/equipment-details.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { OfficeComponent } from './pages/office/office.component';
import { UsersComponent } from './pages/users/users.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'login' , pathMatch: 'full' ,
        component: LoginComponent
      },
      {
        path: 'logout' , pathMatch: 'full' ,
        component: LoginComponent
      },
      {
        path: 'equipments' , pathMatch: 'full' ,
        component: EquipmentsComponent
      },
      {
        path: 'equipments/:id' , pathMatch: 'full' ,
        component: EquipmentDetailsComponent
      },
      {
        path: 'offices' , pathMatch: 'full' ,
        component: OfficeComponent
      },
      {
        path: 'users' , pathMatch: 'full' ,
        component: UsersComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
