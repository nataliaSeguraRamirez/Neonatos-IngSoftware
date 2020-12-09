import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerNeonatoPageRoutingModule } from './ver-neonato-routing.module';

import { VerNeonatoPage } from './ver-neonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerNeonatoPageRoutingModule
  ],
  declarations: [VerNeonatoPage]
})
export class VerNeonatoPageModule {}
