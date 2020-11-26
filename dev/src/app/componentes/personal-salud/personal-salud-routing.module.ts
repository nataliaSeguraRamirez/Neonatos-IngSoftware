import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalSaludPage } from './personal-salud.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalSaludPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalSaludPageRoutingModule {}
