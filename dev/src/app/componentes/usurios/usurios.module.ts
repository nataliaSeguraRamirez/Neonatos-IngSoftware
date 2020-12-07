import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuriosPageRoutingModule } from './usurios-routing.module';

import { UsuriosPage } from './usurios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuriosPageRoutingModule
  ],
  declarations: [UsuriosPage]
})
export class UsuriosPageModule {}
