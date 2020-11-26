import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NologinGuard } from "./guards/nologin.guard" 
import { PacientesComponent } from './componentes/pacientes/pacientes.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path : 'pacientes',
    component: PacientesComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule),canActivate: [NologinGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./componentes/registro/registro.module').then( m => m.RegistroPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'padre',
    loadChildren: () => import('./componentes/padre/padre.module').then( m => m.PadrePageModule)
  },
  {
    path: 'personal-salud',
    loadChildren: () => import('./componentes/personal-salud/personal-salud.module').then( m => m.PersonalSaludPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
