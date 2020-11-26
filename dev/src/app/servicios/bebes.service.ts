import { Injectable } from '@angular/core';
import{AngularFirestore} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class BebesService {

  constructor(private db : AngularFirestore) { }
  getBebe(){
    return this.db.collection('Bebes').snapshotChanges()
  }
}
