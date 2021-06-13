import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { EquipmentDetailsComponent } from './pages/equipments/equipment-details/equipment-details.component';
import { EquipmentsComponent } from './pages/equipments/equipments.component';
import { OfficeComponent } from './pages/office/office.component';
import { UsersComponent } from './pages/users/users.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'login' , pathMatch: 'full' ,
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectLoggedInToDashboard }
      },
      {
        path: 'logout' , pathMatch: 'full' ,
        component: LoginComponent
      },
      {
        path: 'equipments' , pathMatch: 'full' ,
        component: EquipmentsComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'equipments/:id' , pathMatch: 'full' ,
        component: EquipmentDetailsComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'offices' , pathMatch: 'full' ,
        component: OfficeComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'users' , pathMatch: 'full' ,
        component: UsersComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
