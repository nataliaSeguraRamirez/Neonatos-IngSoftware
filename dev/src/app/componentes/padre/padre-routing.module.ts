import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PadrePage } from './padre.page';

const routes: Routes = [
  {
    path: '',
    component: PadrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadrePageRoutingModule {}
