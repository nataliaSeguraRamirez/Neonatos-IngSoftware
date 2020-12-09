import { Component, OnInit } from '@angular/core';
import {NgxDatatableModule}from '@swimlane/ngx-datatable'
import{BebesService}from "../../servicios/bebes.service";
import{AuthService} from '../../servicios/auth.service'
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registro-neonato',
  templateUrl: './registro-neonato.page.html',
  styleUrls: ['./registro-neonato.page.scss'],
})
export class RegistroNeonatoPage implements OnInit {
  private user: any; 
  private bebe: any; 
  private registros: any[]
  private id: any; 
  constructor(private auth: AuthService, 
              private bebeService: BebesService, 
              private alertController: AlertController, 
              private activatedRoute: ActivatedRoute) 
  {
    this.activatedRoute.params.subscribe(params=>{
      this.id = params['id']; 
      this.bebe = this.bebeService.getBebeIndex(this.id)
      this.registros =  this.bebeService.getRegistros(this.bebe.uidPadre); 
    }); 
  }
  doRefresh(event) {
    this.registros =  this.bebeService.getRegistros(this.bebe.uidPadre); 
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  doRefresh1(event) {
    this.registros =  this.bebeService.getRegistros(this.bebe.uidPadre); 
    if(this.registros.length == 0){
      setTimeout(() => {
        this.doRefresh1(event)
        console.log('Async operation has ended');
        event.target.complete();
      }, 2000);
    }
  }
  ngOnInit() {
    this.doRefresh1(event);
    this.doRefresh1(event);
    this.registros =  this.bebeService.getRegistros(this.bebe.uidPadre); 
  }

}

