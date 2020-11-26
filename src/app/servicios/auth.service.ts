import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth"
import { rejects } from 'assert';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { Resolver } from 'dns';
import {AngularFirestore} from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected)=>{
      this.AFauth.signInWithEmailAndPassword(email,password).then(user =>{
        resolve(user.user.uid);
      }).catch(err=> + rejected(err));
    })
  }
  logout(){
    this.AFauth.signOut().then(()=> {
      this.router.navigate(['/login']);
    });
  }
  register(email:string, password: string, name:string, genero:string, tipoUsuario:string, tipoDocumento: string, NoDocumento: string, 
          NoContacto:string, direccion1:string, nombreNeonato: string, edad: string){
    return new Promise((resolve, reject)=>{
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res=>{
        console.log(res.user.uid);
        const uid = res.user.uid;
        let g:string; 
        let tU:string; 
        let tD:string; 
        if (genero == "m")
          g = "Mujer";
        if (genero == "h")
          g = "Hombre";
        if(tipoUsuario == 'a')
          tU = "Acudiente del neonato";
        if (tipoUsuario == 'pS')
          tU = "Personal de la salud"; 
        if (tipoUsuario == 'aD')
          tU = "Administrador";
        if(tipoDocumento == 'cc')
          tD = "Cédula de Ciudadanía"; 
        if(tipoDocumento == 'ce')
          tD = "Cédula de Extranjería"; 
        if(tipoDocumento == "p")
          tD = "Pasaporte";
        this.db.collection('users').doc(res.user.uid).set({
          name : name,
          genero: g, 
          tipoUsuario: tU, 
          tipoDocumento: tD, 
          numeroDocumento: NoDocumento,
          uid: uid, 
          numeroContacto: NoContacto,
        })
        if (tipoUsuario == 'a'){
          this.db.collection('Bebes').doc(res.user.uid).set({
            nombre: nombreNeonato, 
            dirección: direccion1, 
            edad: edad,
          })
        }
        resolve(res)
      }).catch(err => reject(err))
    })
    

  }
}
