import { Component, OnInit } from '@angular/core';
import {UsuariosService, usuario} from '../../servicios/usuarios.service'
import {AuthService} from '../../servicios/auth.service'
import{AngularFireDatabase} from "@angular/fire/database"
import { BebesService, Bebe} from 'src/app/servicios/bebes.service';
@Component({
  selector: 'app-padre',
  templateUrl: './padre.page.html',
  styleUrls: ['./padre.page.scss'],
})
export class PadrePage implements OnInit {
  private user: any; 
  private bebe: any; 
  private SpO2: any; 
  private FC: any;  
  constructor(private auth: AuthService, private usuariosService: UsuariosService, private bebeService: BebesService) { 
    this.user = usuariosService.getUsuario(auth.getUid);
    this.bebe = bebeService.getUidPadre(this.user.uid); 
    this.SpO2 = bebeService.getSpO2(this.user.uid); 
    this.FC = bebeService.getFC(this.user.uid);
  }

  Onlogout(){
    this.auth.logout();
  }
  ngOnInit() {
    this.bebe = this.bebeService.getUidPadre(this.user.uid); 
    this.doRefresh(event);
  }
  doRefresh(event) {
    this.SpO2 = this.bebeService.getSpO2(this.user.uid);
    this.FC = this.bebeService.getFC(this.user.uid); 

    setTimeout(() => {
      this.doRefresh(event);
      let d = new Date();
      let dd = d.getDate();
      let mm = d.getMonth() + 1;
      let yy = d.getFullYear();
      let hor = d.getHours();
      let min = d.getMinutes(); 
      let sec = d.getSeconds(); 
      let myDateString = dd + "/" + mm + "/" + yy;
      let horaString = hor + ":"+ min + ":" + sec;
      console.log(myDateString, horaString); 
      this.bebeService.anadirFrecuenciaCardicaSpO2(this.SpO2, this.FC,this.bebe, myDateString, horaString); 
      event;
    }, 7000);
  }
}
