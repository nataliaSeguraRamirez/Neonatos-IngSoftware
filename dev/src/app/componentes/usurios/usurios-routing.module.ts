import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuriosPage } from './usurios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuriosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuriosPageRoutingModule {}
