import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {BebesService} from'../../servicios/bebes.service'
@Component({
  selector: 'app-personal-salud',
  templateUrl: './personal-salud.page.html',
  styleUrls: ['./personal-salud.page.scss'],
})
export class PersonalSaludPage implements OnInit {

  private user: any;  
  private bebes: any[]; 
  constructor(public authServicie: AuthService, public usuarioService:UsuariosService,public router: Router, 
              private bebeService: BebesService,
              public alertController: AlertController) {
    this.user = usuarioService.getUsuario(authServicie.getUid);
    this.bebes = this.bebeService.getBebesUsuario(this.user.uid); 
    this.doRefresh1(event); 
  }
  Onlogout(){
    this.authServicie.logout();
  }
  ngOnInit() {
    this.bebes = this.bebeService.getBebesUsuario(this.user.uid); 
    this.doRefresh1(event); 
  }
  doRefresh1(event) {
    this.bebes =  this.bebeService.getBebesUsuario(this.user.uid) 
    if(this.bebes.length == 0){
      setTimeout(() => {
        this.doRefresh1(event); 
        console.log('Async operation has ended');
        event;
      }, 2000);
    }
  }
  doRefresh(event) {
    this.bebes =  this.bebeService.getBebesUsuario(this.user.uid) 
    setTimeout(() => {
      this.doRefresh(event);
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async activarMenu(index: number){
    const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      buttons:[
        {
          text: 'Ver registros',
          cssClass: 'secondary',
          handler:()=>{
            this.verRegistros(index);
          }
        },
        {
          text: 'Ver Neonato',
          cssClass: 'secondary',
          handler:()=>{
            this.verNeonato(index);
          }
        },
      ]
    })
    ;(await alert).present(); 
  }
  verRegistros(index: number){
    let uid = this.bebes[index].uidPadre;
    console.log(this.bebeService.getIndexBebe(uid), uid)
    //this.bebeService.getRegistrosAux(this.bebeService.getBebeIndex(i).uidPadre)
    this.router.navigate(['registro-neonato', this.bebeService.getIndexBebe(uid)])
  }
  verNeonato(index:number){
    console.log(index)
  }

}
