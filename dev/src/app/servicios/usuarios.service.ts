import { NgForOf } from '@angular/common';
import { Injectable } from '@angular/core';
import{AngularFirestore} from "@angular/fire/firestore";
import firebase from 'firebase/app';
import { map } from "rxjs/operators";

export interface usuario{
  genero: string,
  name: string,
  numeroContacto:string,
  numeroDocumento: string,
  tipoDocumento: string,
  tipoUsuario:string,
  uid:string,
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
}
