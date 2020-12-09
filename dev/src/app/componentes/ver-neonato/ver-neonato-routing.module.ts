import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerNeonatoPage } from './ver-neonato.page';

const routes: Routes = [
  {
    path: '',
    component: VerNeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerNeonatoPageRoutingModule {}
