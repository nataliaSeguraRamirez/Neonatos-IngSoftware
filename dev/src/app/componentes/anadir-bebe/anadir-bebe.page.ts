import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {BebesService} from'../../servicios/bebes.service'
@Component({
  selector: 'app-anadir-bebe',
  templateUrl: './anadir-bebe.page.html',
  styleUrls: ['./anadir-bebe.page.scss'],
})
export class AnadirBebePage implements OnInit {

  private bebes:any[]; 
  private id : any; 
  private user : any; 
  myList: string;
  constructor(private activatedRoute: ActivatedRoute,
              private bebeService: BebesService,
              private router:Router, 
              private usuariosService: UsuariosService,
              public alertController: AlertController) {
   }
  ngOnInit() : void{
    this.bebes = this.bebeService.getBebes();
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.user = this.usuariosService.getUsuarioIndex(params['id']);
    });
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
          text: 'Añadir',
          cssClass: 'secondary',
          handler:()=>{
            this.anadirBebe(index);
          }
        },
      ]
    })
    ;(await alert).present(); 
  }
  anadirBebe(index: number){
    this.usuariosService.anadirNeonatoMedico(this.bebeService.getBebeIndex(index), this.user.uid);
    this.bebeService.setUidMedico(this.bebeService.getBebeIndex(index),this.user.uid);
    this.usuariosService.modificarUIDMedicoNeonato(this.bebeService.getBebeIndex(index), this.user.uid);
  }
}
