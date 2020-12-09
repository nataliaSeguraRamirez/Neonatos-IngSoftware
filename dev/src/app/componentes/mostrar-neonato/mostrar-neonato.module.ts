import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarNeonatoPageRoutingModule } from './mostrar-neonato-routing.module';

import { MostrarNeonatoPage } from './mostrar-neonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarNeonatoPageRoutingModule
  ],
  declarations: [MostrarNeonatoPage]
})
export class MostrarNeonatoPageModule {}
