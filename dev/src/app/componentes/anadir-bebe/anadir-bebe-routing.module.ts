import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnadirBebePage } from './anadir-bebe.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirBebePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnadirBebePageRoutingModule {}
