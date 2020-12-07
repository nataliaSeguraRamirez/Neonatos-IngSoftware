import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnadirBebePageRoutingModule } from './anadir-bebe-routing.module';

import { AnadirBebePage } from './anadir-bebe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnadirBebePageRoutingModule
  ],
  declarations: [AnadirBebePage]
})
export class AnadirBebePageModule {}
