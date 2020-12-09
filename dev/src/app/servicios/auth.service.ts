import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/auth"
import { rejects } from 'assert';
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { Resolver } from 'dns';
import {AngularFirestore} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { UsuariosService } from './usuarios.service';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';
import { BebesService } from './bebes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uid:any; 
  private password: any; 
  private user: any;
  private users: any[]; 
  private bebe: any[]; 
  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore, uS: UsuariosService, bS: BebesService) { 
    this.users = uS.getUsuarios();  
    this.bebe = bS.getBebes();  
    let bebeU = bS.getBebesUsuario(this.uid);
    bS.getVariablesAux(this.uid);  
  }
  login(email:string, password:string){
    this.password = password; 
    return new Promise((resolve, rejected)=>{
      this.AFauth.signInWithEmailAndPassword(email,password).then(user =>{
        this.uid = user.user.uid; 
        resolve(user.user.uid);
      }).catch(err=>  rejected(err));
    })
  }
  getUser(){
    this.user = firebase.auth().currentUser;
    return this.user; 
  }
  getUid(){
    return this.uid; 
  }
  getPassword(){
    return this.password; 
  }
  updatePassword(newPassword: string){
    this.user = firebase.auth().currentUser; 
    console.log(this.user)
    return new Promise ((resolve, rejected)=>{
      this.user.updatePassword(newPassword).then(u=>{
        resolve(u)
      }).catch(err => rejected(err));
    })
  }
  logout(){
    this.AFauth.signOut().then(()=> {
      this.uid = undefined; 
      this.router.navigate(['/login']);
    });
  }
  register(email:string, password: string, name:string, genero:string, tipoUsuario:string, tipoDocumento: string, NoDocumento: string, 
          NoContacto:string, direccion1:string, nombreNeonato: string, edad: string){
    return new Promise((resolve, reject)=>{
      this.AFauth.createUserWithEmailAndPassword(email, password).then(res=>{
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
          correo : email,
        })
        if (tipoUsuario == 'a'){
          this.db.collection('Bebes').doc(res.user.uid).set({
            nombrePadre: name,
            nombre: nombreNeonato, 
            dirección: direccion1, 
            edad: edad,
            uidPadre: uid, 
            uidMédico: "",
            i : 0
          })
          this.db.collection('users').doc(res.user.uid).collection('Neonatos').doc(res.user.uid).set({
            nombrePadre: name,
            nombre: nombreNeonato, 
            dirección: direccion1, 
            edad: edad,
            uidPadre: uid, 
            uidMédico: "",
            i : 0
          })
        }
        resolve(res)
      }).catch(err => reject(err))
    })
  }
  delete(uid:any){
     this.AFauth
  }
}
