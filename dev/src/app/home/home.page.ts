import { Component, OnInit } from '@angular/core';
import { AuthService} from "../servicios/auth.service";
import { Router } from "@angular/router";
import {LoginPage} from "../componentes/login/login.page"
import {UsuariosService, usuario} from "../servicios/usuarios.service";
import { isNullOrUndefined } from 'util';
import firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private uid: any;
  private user: any;
  constructor(public authServicie: AuthService, public usuarioService:UsuariosService,public router: Router) {
    this.uid = this.authServicie.getUid();
  }
  Onlogout(){
    this.authServicie.logout();
  }
  ngOnInit(){
    this.uid = this.authServicie.getUid();
    this.user = this.usuarioService.getUsuario(this.uid);
    console.log(this.user);
  }
}
