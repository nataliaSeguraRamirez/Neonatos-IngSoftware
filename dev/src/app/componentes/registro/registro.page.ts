import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service'
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
import { isNullOrUndefined } from 'util';
import  firebase from 'firebase/app';
import { Camera } from '@capacitor/core/dist/esm/web/camera';
import { CameraPhoto, CameraResultType, CameraSource, Filesystem, FilesystemDirectory } from '@capacitor/core';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email: string; 
  public password: string;
  public nombre: string; 
  public genero: string; 
  public TU: string;
  public TD: string; 
  public NoDocumento: string; 
  public NoContacto: string; 
  public direccion: string; 
  public nombreNeonato: string; 
  public edad: string; 
  private photos: any;
  constructor(public alertController: AlertController, private auth: AuthService, public router: Router) { 
    
  }

  ngOnInit() {
  }
  async OnSumitRegister(){
    let tipoUsuario: string ; 
    if(this.email == undefined || this.password == undefined || this.nombre == undefined||
      this.genero == undefined || this.TU == undefined || this.TD == undefined||
      this.NoDocumento == undefined || this.NoContacto == undefined){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Falta campos por diligenciar', 
        message: 'Por favor verificar que toda la información este completa',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/registro']);
    }
    if(this.TU === 'a'){
      if (this.direccion == undefined, this.nombreNeonato == undefined, this.edad == undefined){
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: 'Falta campos por diligenciar', 
          message: 'Por favor verificar que toda la información este completa',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/registro']);
      }
    }
    if (this.TU == 'a'){
      tipoUsuario ="Acudiente del neonato ";
    }
    if(this.TU == 'pS'){
      tipoUsuario = "Personal de la salud";
    }
    if(this.TU == 'aD'){
      tipoUsuario = "Administrador";
    }
    this.auth.register(this.email, this.password, this.nombre, this.genero, this.TU, this.TD,
                      this.NoDocumento, this.NoContacto, this.direccion, this.nombreNeonato, this.edad).then(async auth=>{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Usuario registrado: ' + this.nombre ,
        message: 'El usuario fue registrado existosamente cómo '+ tipoUsuario,
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/principal']);
      console.log(auth)
    }).catch(err => console.log(err)); 
  }
 
}
