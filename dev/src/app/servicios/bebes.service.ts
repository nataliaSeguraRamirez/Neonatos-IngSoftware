import { Injectable } from '@angular/core';
import{AngularFirestore} from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import{AngularFireDatabaseModule, AngularFireDatabase, snapshotChanges} from "@angular/fire/database"
import firebase from 'firebase/app';
export interface Bebe{
  nombrePadre:string,
  nombre:string,
  dirección:string,
  edad:string,
  uidPadre:string,
  uidMédico:string,
  i:number
} 
export interface Variables{
  FC: number, 
  SpO2: number,
  Fecha: string,
  Hora: string,
  i:number
} 
@Injectable({
  providedIn: 'root'
})
export class BebesService {
  private bebe: Bebe; 
  private bebes: Bebe[] = []; 
  private SpO2: any; 
  private FC: any; 
  private bebeU: Bebe[] = [];
  private j: number; 
  private database: firebase.database.Database;
  private registros: Variables[] =[];  
  constructor(private db : AngularFirestore, private adDb:AngularFireDatabase ) { 
    
  }
  getBebeAux(){
    return this.db.collection('Bebes').snapshotChanges().pipe(map(bebe=>{
      return bebe.map(u=>{
        const data = u.payload.doc.data() as Bebe;
        data.uidPadre = u.payload.doc.id; 
        return data; 
      })
    }))
  }
  getBebesUsuarioAux(uid:any){
    return this.db.collection('users').doc(uid).collection('Neonatos').snapshotChanges().pipe(map(bebe=>{
      return bebe.map(u=>{
        const data = u.payload.doc.data() as Bebe;
        data.uidPadre = u.payload.doc.id; 
        return data; 
      })
    }))
  } 
  getBebesUsuario(uid: any){
    this.getBebesUsuarioAux(uid).subscribe(b=>{
      this.bebeU = b;  
    }); 
    return this.bebeU; 
  }
  getBebes(){
    this.getBebeAux().subscribe(b => {
      this.bebes = b;   
    });
    return this.bebes; 
  }
  getUidPadre(uid:any){
    this.bebes.forEach(u=>{
      if(u.uidPadre == uid){
        this.bebe = u;  
      }
    }); 
    return this.bebe; 
  }
  getUidMedico(uid:any){
    this.bebes.forEach(u=>{
      if(u.uidPadre == uid){
        this.bebe = u;  
      }
    });
    return this.bebe; 
  }
  getBebeIndex(index:number){
    return this.bebes[index];
  }
  getVariablesAux(uid:any) {
    this.adDb.database.ref(uid).on('value', (snapshot) => {
      const data = snapshot.val();
      this.SpO2 = data.SpO2
      this.FC = data.FC
    })
  }
  getVariables(uid:any){
     this.getVariablesAux(uid);
  }
  getSpO2(uid:any){
    this.getVariables(uid); 
    return this.SpO2
  }
  getFC(uid: any){
    this.getVariables(uid); 
    return this.FC; 
  }
  setUidMedico(bebe:any, uidMedico: any){
    return new Promise ((resolve, reject)=>{
      this.db.collection('Bebes').doc(bebe.uidPadre).set({
        nombrePadre: bebe.nombrePadre,
        nombre: bebe.nombre, 
        dirección: bebe.dirección, 
        edad: bebe.edad,
        uidPadre: bebe.uidPadre, 
        uidMédico: uidMedico,
        i: bebe.i
      })
      resolve(true)
    })
  }
  getRegistrosAux(uid:any){
    return this.db.collection('Bebes').doc(uid).collection('Frecuencia Cardiaca y SpO2').snapshotChanges().pipe(map(bebe=>{
      return bebe.map(u=>{
        const data = u.payload.doc.data() as Variables;
        console.log(data)
        return data; 
      })
    }))
  }
  getRegistros(uid:any){
    this.getRegistrosAux(uid).subscribe(b => {
      this.registros = b;   
    });
    console.log(this.registros); 
    return this.registros;
  }
  anadirFrecuenciaCardicaSpO2(spo2, fc, bebe:any, fecha, hora){
    this.db.collection('Bebes').doc(bebe.uidPadre).collection('Frecuencia Cardiaca y SpO2').doc('Toma' + String(bebe.i)).set({
      SpO2: spo2,
      FC: fc,
      Fecha: fecha,
      Hora: hora,
      i: bebe.i 
    })
    bebe.i = bebe.i + 1; 
    this.db.collection('Bebes').doc(bebe.uidPadre).set({
      nombrePadre: bebe.nombrePadre,
      nombre: bebe.nombre, 
      dirección: bebe.dirección, 
      edad: bebe.edad,
      uidPadre: bebe.uidPadre, 
      uidMédico: bebe.uidMédico,
      i: bebe.i
    })
  }
  public getIndexBebe(uid:any){
    this.j = 0; 
    for(let b of this.bebes){
      if(b.uidPadre == uid){
        break; 
      }
      this.j = this.j + 1;
    }
    return this.j; 
  }
  
}
