import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarNeonatoPage } from './mostrar-neonato.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarNeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarNeonatoPageRoutingModule {}
