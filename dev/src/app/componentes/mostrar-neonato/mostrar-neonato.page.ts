import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {BebesService} from '../../servicios/bebes.service'
@Component({
  selector: 'app-mostrar-neonato',
  templateUrl: './mostrar-neonato.page.html',
  styleUrls: ['./mostrar-neonato.page.scss'],
})
export class MostrarNeonatoPage implements OnInit, OnDestroy {

  private user:any;
  private id : number;
  private bebe: any[];  
  constructor(private activatedRoute: ActivatedRoute,
              private usuariosService: UsuariosService,
              private router:Router, private bebeService: BebesService) { 
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.user = this.usuariosService.getUsuarioIndex(params['id']);
      this.bebe = this.bebeService.getBebesUsuario(this.user.uid);
    });
    
  }
  doRefresh(event) {
    this.bebe =  this.bebeService.getBebesUsuario(this.user.uid) 
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  ngOnInit() {
    this.bebe = this.bebeService.getBebesUsuario(this.user.uid) 
    this.ngOnDestroy(); 
  }
  ngOnDestroy(){

  }

}
