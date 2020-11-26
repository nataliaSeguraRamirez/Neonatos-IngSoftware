import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service'
import { Router } from "@angular/router";
import { AlertController } from '@ionic/angular';
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
  constructor(public alertController: AlertController, private auth: AuthService, public router: Router) { }

  ngOnInit() {
  }
  OnSumitRegister(){
    let tipoUsuario: string ; 
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
        message: 'El usuario fue registrado existosamente cómo '+ tipoUsuario + this.nombreNeonato,
        buttons: ['OK']
      });
  
      await alert.present();
      this.router.navigate(['/home']);
      console.log(auth)
    }).catch(err => console.log(err)); 
  }
}
