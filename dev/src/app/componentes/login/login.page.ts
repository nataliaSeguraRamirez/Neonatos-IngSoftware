import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service';
import { Router } from "@angular/router";
import {UsuariosService} from "../../servicios/usuarios.service";
import firebase from 'firebase/app';
import { LoadingController } from '@ionic/angular';
interface usuario{
  genero: string,
  nombre: string,
  numeroContacto:string,
  numeroDocumento: string,
  tipoDocumento: string,
  tipoUsuario:string,
  uid:string,
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any; 
  users: any[];
  email: string;
  password: string;
  loadingCtrl: any;
  constructor(private authService: AuthService, public router: Router, 
              public usuarioService: UsuariosService, public loadingController: LoadingController) { }

  ngOnInit() {
  
    if(this.authService.getUid === undefined){
      this.authService.logout();
    }
    this.router.navigate(["/home"]);

  }

  onSubmitLogin()
  {
    this.presentLoading();
    this.authService.login(this.email, this.password).then(res => {

      this.router.navigate(['/home']);
    }).catch(err => alert("Los datos son incorrectos o no existe el usuario"))
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
