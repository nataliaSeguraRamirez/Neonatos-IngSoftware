import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroNeonatoPage } from './registro-neonato.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroNeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroNeonatoPageRoutingModule {}
