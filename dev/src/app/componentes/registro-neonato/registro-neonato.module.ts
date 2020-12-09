import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroNeonatoPageRoutingModule } from './registro-neonato-routing.module';

import { RegistroNeonatoPage } from './registro-neonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroNeonatoPageRoutingModule
  ],
  declarations: [RegistroNeonatoPage]
})
export class RegistroNeonatoPageModule {}
