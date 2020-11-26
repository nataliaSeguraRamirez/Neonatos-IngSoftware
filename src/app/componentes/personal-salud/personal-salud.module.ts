import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalSaludPageRoutingModule } from './personal-salud-routing.module';

import { PersonalSaludPage } from './personal-salud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalSaludPageRoutingModule
  ],
  declarations: [PersonalSaludPage]
})
export class PersonalSaludPageModule {}
