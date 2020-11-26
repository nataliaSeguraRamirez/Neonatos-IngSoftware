import { Component, OnInit } from '@angular/core';
import { fchmod } from 'fs';
import { AuthService} from "../servicios/auth.service";
import {BebesService} from "../servicios/bebes.service";
interface chat{
  nombre: string,
  img: string,
  nombrePadre:string,
  frecuenciaCardica: number,
  SpO2: number,
  id:string,
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public bebes : any = [];

  constructor(public authServicie: AuthService, public bebeservice:BebesService) {}
  Onlogout(){
    this.authServicie.logout();
  }
  ngOnInit(){
    this.bebeservice.getBebe().subscribe(chats =>{
      chats.map(chat=>{
        const data : chat = chat.payload.doc.data() as chat; 
        data.id = chat.payload.doc.id;
        this.bebes.push(data);
      });
    });
  }
}
