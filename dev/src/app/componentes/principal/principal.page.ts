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
  constructor(private auth: AuthService, private usuariosService: UsuariosService, public alertController: AlertController, 
              private router:Router, private bebe: BebesService) { 
    this.user = usuariosService.getUsuario(auth.getUid);
    this.users = usuariosService.getUsuarios(); 
    this.activo = false; 
    this.bebe.getVariables();
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
  ngOnInit() {
    
  }

}
