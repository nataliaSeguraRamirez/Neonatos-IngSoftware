import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {

  private user:any;
  private genero: string; 
  private tipoUsuario: string; 
  private tipoDocumento: string; 
  public password: string;
  public nombre: string;
  public NoDocumento: string; 
  public NoContacto: string;  
  constructor(private activatedRoute: ActivatedRoute,
              private usuariosService: UsuariosService, public router: Router,
              public alertController: AlertController) 
  {  }
  ngOnInit():void {
    this.activatedRoute.params.subscribe(params => {
      let n: number = params['id'];
      this.user = this.usuariosService.getUsuarioIndex(params['id']);
      console.log(params['id']);
      console.log(this.usuariosService.getUsuarioIndex(params['id']));
      this.nombre = this.user.name
      this.NoContacto = this.user.numeroContacto
      this.NoDocumento = this.user.numeroDocumento 
      if (this.user.genero == "Mujer")
          this.genero = "m";
      if (this.user.genero == "Hombre")
        this.genero = "h";
      if(this.user.tipoUsuario == 'Acudiente del neonato')
        this.tipoUsuario = "a";
      if (this.user.tipoUsuario == 'Personal de la salud')
        this.tipoUsuario = "pS"; 
      if (this.user.tipoUsuario == 'Administrador')
        this.tipoUsuario = "aD";
      if(this.user.tipoDocumento == 'Cédula de Ciudadanía')
        this.tipoDocumento = "cc"; 
      if(this.user.tipoDocumento == 'Cédula de Extranjería')
        this.tipoDocumento = "ce"; 
      if(this.user.tipoDocumento == "Pasaporte")
        this.tipoDocumento= "p";
        console.log(this.tipoUsuario);
        console.log(this.tipoDocumento); 
    });
  }
  async modificar(){
    if(this.nombre == undefined|| this.genero == undefined ||
       this.tipoUsuario == undefined || this.tipoDocumento == undefined||
      this.NoDocumento == undefined || this.NoContacto == undefined){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Falta campos por diligenciar', 
        message: 'Por favor verificar que toda la información este completa',
        buttons: ['OK']
      });
      await alert.present();
      this.router.navigate(['/principal']);
    }else{

    }
    let TU: string; 
    if (this.tipoUsuario == 'a'){
      TU ="Acudiente del neonato ";
    }
    if(this.tipoUsuario == 'pS'){
      TU = "Personal de la salud";
    }
    if(this.tipoUsuario == 'aD'){
      TU = "Administrador";
    }
    let tD: string
    if(this.tipoDocumento == 'cc')
      tD = "Cédula de Ciudadanía"; 
    if(this.tipoDocumento == 'ce')
      tD = "Cédula de Extranjería"; 
    if(this.tipoDocumento == "p")
      tD = "Pasaporte";
    let g : string 
    if (this.genero == "m")
      g = "Mujer";
    if (this.genero == "h")
      g = "Hombre";
    this.usuariosService.writeUserData(this.nombre,g, TU, tD, this.NoDocumento, 
      this.NoContacto, this.user.uid).then(async auth=>{
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: 'Se realizo la modificación ',
          message: 'El usuario modificado fue :' + this.nombre ,
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigate(['/principal']);
        console.log(auth)
        this.ngOnInit();
      }).catch
  }
}
