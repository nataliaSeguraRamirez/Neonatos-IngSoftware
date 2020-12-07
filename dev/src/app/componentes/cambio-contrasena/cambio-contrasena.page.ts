import { Component, OnInit } from '@angular/core';
import {AuthService} from"../../servicios/auth.service"
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
password: string; 
passwordNew : string; 
passwordNewConfir: string; 
  constructor(public auth:AuthService, public alertController: AlertController, public router: Router) { }

  ngOnInit() {
  }
  async actualizarContrasena(){
    let alert; 
    this.auth.updatePassword(this.passwordNew).then(async res=>{
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: "La contraseña se cambio existosamente" ,
        message: 'Se debe de verificar la información, por ende debe de iniciar sesión',
        buttons: ['OK']
      })
      await alert.present();
      this.auth.logout();
    }).catch(async err=>{
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: "No se hizo el cambio de la contraseña " ,
        message: 'No se realizo el cambio de la contraseña',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/cambio-contrasena'])
    })
    /*
    if (this.auth.getPassword() === this.password){
      if(this.passwordNew === this.passwordNewConfir){
        
      }else{
        alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: "No se hizo el cambio de la contraseña " ,
          message: 'No coinciden las contraseñas nuevas ingresadas',
          buttons: ['OK']
        });
        await alert.present();
      }
    }else{
      alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: "La contraseña actual no coincide" ,
        message: 'Volver de digitar la contraseña actual',
        buttons: ['OK']
      });
      await alert.present();
    }
    this.router.navigate(['/cambio-contrasena']);*/
  }

}
