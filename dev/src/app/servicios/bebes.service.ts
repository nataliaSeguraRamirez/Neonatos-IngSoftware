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
} 
export interface Variables{
  FC: number, 
  SpO2: number,
} 
@Injectable({
  providedIn: 'root'
})
export class BebesService {
  private bebe: Bebe; 
  private bebes: Bebe[]= []; 
  private SpO2: any; 
  private FC: any; 
  constructor(private db : AngularFirestore, private adDb: AngularFireDatabase) { }
  getBebeAux(){
    return this.db.collection('Bebes').snapshotChanges().pipe(map(bebe=>{
      return bebe.map(u=>{
        const data = u.payload.doc.data() as Bebe;
        data.uidPadre = u.payload.doc.id; 
        return data; 
      })
    }))
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
    }) 
    return this.bebe; 
  }
  getUidMedico(uid:any){
    this.bebes.forEach(u=>{
      if(u.uidPadre == uid){
        this.bebe = u;  
      }
    }) 
    return this.bebe; 
  }
  getBebeIndex(index:number){
    return this.bebes[index];
  }
  getVariablesAux(){
    
    this.adDb.database.ref('Bebe1').on('value', (snapshot)=>{
      const data = snapshot.val();
      this.SpO2 = data.SpO2
      this.FC = data.FC 
    })
  }
  getVariables(){
     this.getVariablesAux();
     console.log(this.SpO2, this.FC)
  }
  
}
