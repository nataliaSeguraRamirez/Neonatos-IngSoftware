import { Component, ErrorHandler, OnInit } from '@angular/core';
import {UsuariosService, usuario} from '../../servicios/usuarios.service'
import {AuthService} from '../../servicios/auth.service'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import{AngularFireDatabase} from "@angular/fire/database"
import{BebesService}from "../../servicios/bebes.service";
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  private user: any;
  private users: any[];
  private activo: boolean; 
  private myList:any;  
  private bebes: any[];
  private bebe1; 
  constructor(private auth: AuthService, private usuariosService: UsuariosService, public alertController: AlertController, 
              private router:Router, private bebe: BebesService) { 
    this.user = usuariosService.getUsuario(auth.getUid);
    this.users = usuariosService.getUsuarios(); 
    this.bebes = this.bebe.getBebes(); 
    this.activo = false; 
  }
  Onlogout(){
    this.auth.logout();
  }
  prueba(){
    console.log("Prueba"); 
  }
  eliminarCuenta(index:number){
    let user = this.usuariosService.getUsuarioIndex(index);
    this.auth.delete(user.uid);
  }
  verMas(index:number){
    this.bebe1 = this.bebe.getBebesUsuario(this.usuariosService.getUsuarioIndex(index).uid); 
    console.log(this.router.navigate(['usurios', index]));
  }
  modificarUsuario(index: number){
    this.router.navigate(['modificar-usuario', index]);
    this.users = this.usuariosService.getUsuarios(); 
  }
  async activarMenu(index: number){
    this.myList = "<ion-list><ion-item (click)='this.prueba()'><ion-label>" +
                  "<h2> <b>Modificar</b> </h2></ion-label></ion-item><ion-item (click)='this.prueba()'>" +
                  "<ion-label><h2> <b>Eliminar</b> </h2></ion-label></ion-item>"+
                  "<ion-item (click)='this.prueba()'><ion-label><h2> <b>Ver más....</b> </h2>"+
                  "</ion-label></ion-item></ion-list>"; 
    const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      buttons:[
        {
          text: 'Modificar',
          cssClass: 'secondary',
          handler:()=>{
            this.modificarUsuario(index);
          }
        },
        {
          text: 'Eliminar',
          cssClass: 'secondary',
          handler:()=>{
            this.eliminarCuenta(index);
          }
        },
        {
          text: 'Ver más....',
          cssClass: 'secondary',
          handler:()=>{
            this.verMas(index);
          }
        },
      ]
    })
    ;(await alert).present(); 
  }
  doRefresh(event) {
    this.users = this.usuariosService.getUsuarios(); 

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  doRefresh1(event) {
    this.users =  this.usuariosService.getUsuarios(); 
    setTimeout(() => {
      this.doRefresh(event)
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {
    this.doRefresh1(event);
  }

}
