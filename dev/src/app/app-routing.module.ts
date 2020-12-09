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
    loadChildren: () => import('./componentes/padre/padre.module').then( m => m.PadrePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'personal-salud',
    loadChildren: () => import('./componentes/personal-salud/personal-salud.module').then( m => m.PersonalSaludPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'principal',
    loadChildren: () => import('./componentes/principal/principal.module').then( m => m.PrincipalPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'cambio-contrasena',
    loadChildren: () => import('./componentes/cambio-contrasena/cambio-contrasena.module').then( m => m.CambioContrasenaPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'usurios/:id',
    loadChildren: () => import('./componentes/usurios/usurios.module').then( m => m.UsuriosPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'modificar-usuario/:id',
    loadChildren: () => import('./componentes/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'anadir-bebe/:id',
    loadChildren: () => import('./componentes/anadir-bebe/anadir-bebe.module').then( m => m.AnadirBebePageModule),  canActivate: [AuthGuard]
  },
  {
    path: 'mostrar-neonato/:id',
    loadChildren: () => import('./componentes/mostrar-neonato/mostrar-neonato.module').then( m => m.MostrarNeonatoPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'registro-neonato/:id',
    loadChildren: () => import('./componentes/registro-neonato/registro-neonato.module').then( m => m.RegistroNeonatoPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'ver-neonato',
    loadChildren: () => import('./componentes/ver-neonato/ver-neonato.module').then( m => m.VerNeonatoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
