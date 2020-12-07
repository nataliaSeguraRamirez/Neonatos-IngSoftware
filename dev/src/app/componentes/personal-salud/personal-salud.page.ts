import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-personal-salud',
  templateUrl: './personal-salud.page.html',
  styleUrls: ['./personal-salud.page.scss'],
})
export class PersonalSaludPage implements OnInit {

  private user: any;  
  constructor(public authServicie: AuthService, public usuarioService:UsuariosService,public router: Router) {
    this.user = usuarioService.getUsuario(authServicie.getUid);
  }
  Onlogout(){
    this.authServicie.logout();
  }
  ngOnInit() {
  }

}
