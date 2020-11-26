import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PadrePageRoutingModule } from './padre-routing.module';

import { PadrePage } from './padre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PadrePageRoutingModule
  ],
  declarations: [PadrePage]
})
export class PadrePageModule {}
