import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usurios',
  templateUrl: './usurios.page.html',
  styleUrls: ['./usurios.page.scss'],
})
export class UsuriosPage implements OnInit {

  private user:any;
  private id : number; 
  constructor(private activatedRoute: ActivatedRoute,
              private usuariosService: UsuariosService,
              private router:Router) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.user = this.usuariosService.getUsuarioIndex(params['id']);
      console.log(params['id']);
      console.log(this.usuariosService.getUsuarioIndex(params['id']));
    });
  }
  modificarUsuario(){
    this.router.navigate(['modificar-usuario', this.id]);
  }
  anadirNeonato(){
    
  }
  ngOnInit() : void {
  }

}
