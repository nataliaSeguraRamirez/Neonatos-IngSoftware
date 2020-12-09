import { Injectable } from '@angular/core';
import{AngularFirestore} from "@angular/fire/firestore";
import { resolve } from 'dns';
import firebase from 'firebase/app';
import { promise } from 'protractor';
import { map } from "rxjs/operators";
import {Variables} from '../servicios/bebes.service'
export interface usuario{
  genero: string,
  name: string,
  numeroContacto:string,
  numeroDocumento: string,
  tipoDocumento: string,
  tipoUsuario:string,
  uid:string,
  correo: string
} 
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private user: usuario; 
  private users: usuario[]= [];
  private database: firebase.database.Database; 
  constructor(private db : AngularFirestore) { 
   }
  getUsuariosAux(){
    return this.db.collection('users').snapshotChanges().pipe(map(user=>{
      return user.map(u=>{
        const data = u.payload.doc.data() as usuario; 
        data.uid = u.payload.doc.id; 
        return data; 
      })
    }))
  }
  getUsuarios(){
    this.getUsuariosAux().subscribe(u => {
      this.users = u;   
    });
    return this.users; 
  }
  getUsuario(uid:any){
    this.users.forEach(u=>{
      if(u.uid == uid){
        this.user = u;  
      }
    }) 
    return this.user; 
  }
  getUsuarioIndex(index:number){
    return this.users[index];
  }
  writeUserData(name:string, genero:string, tipoUsuario:string, tipoDocumento: string, NoDocumento: string, 
    NoContacto:string, uid)
  {
    return new Promise ((resolve, reject)=>{
      this.db.collection('users').doc(uid).set({
        genero: genero,
        name: name,
        numeroContacto: NoContacto,
        numeroDocumento: NoDocumento,
        tipoDocumento: tipoDocumento,
        tipoUsuario: tipoUsuario,
        uid:uid
      }); 
      resolve(true)
    });
  }
  anadirNeonatoMedico(bebe:any, uid:any){
    return new Promise ((resolve, reject)=>{
      this.db.collection('users').doc(uid).collection('Neonatos').doc(bebe.uidPadre).set({
        nombrePadre: bebe.nombrePadre,
        nombre: bebe.nombre, 
        dirección: bebe.dirección, 
        edad: bebe.edad,
        uidPadre: bebe.uidPadre, 
        uidMédico: uid,
        i: bebe.i
      });
      resolve(true)
    })
  }
  modificarUIDMedicoNeonato(bebe:any, uid: any){
    return new Promise ((resolve, reject)=>{
      this.db.collection('users').doc(bebe.uidPadre).collection('Neonatos').doc(bebe.uidPadre).set({
        nombrePadre: bebe.nombre,
        nombre: bebe.nombrePadre, 
        dirección: bebe.dirección, 
        edad: bebe.edad,
        uidPadre: bebe.uidPadre, 
        uidMédico: uid,
        i: bebe.i
      });
      resolve(true)
    })
  }
}
