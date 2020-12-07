import { Component, OnInit } from '@angular/core';
import {UsuariosService, usuario} from '../../servicios/usuarios.service'
import {AuthService} from '../../servicios/auth.service'
import{AngularFireDatabase} from "@angular/fire/database"
@Component({
  selector: 'app-padre',
  templateUrl: './padre.page.html',
  styleUrls: ['./padre.page.scss'],
})
export class PadrePage implements OnInit {
  private user: any; 
  constructor(private auth: AuthService, private usuariosService: UsuariosService) { 
    this.user = usuariosService.getUsuario(auth.getUid);
  }
  Onlogout(){
    this.auth.logout();
  }
  ngOnInit() {
  }

}
