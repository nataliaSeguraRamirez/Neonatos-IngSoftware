import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BebesService } from 'src/app/servicios/bebes.service';
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
              private router:Router, private bebe: BebesService) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.user = this.usuariosService.getUsuarioIndex(params['id']);
    });
  }
  modificarUsuario(){
    this.router.navigate(['modificar-usuario', this.id]);
  }
  anadirNeonato(){
    this.router.navigate(['anadir-bebe', this.id])
  }
  mostrarNeonatos(){
    let bebe = this.bebe.getBebesUsuario(this.user.uid) 
    this.router.navigate(['mostrar-neonato', this.id])

  }
  doRefresh(event) {
    this.user =  this.usuariosService.getUsuarioIndex(this.id); 

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ngOnInit() : void {
  }

}
