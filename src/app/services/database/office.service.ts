
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';

interface Office {
  id: string,
  name: string,
  location: string,
  created_at: any,
  updated_at: any
}

@Injectable({
  providedIn: 'root'
})

export class OfficeService {
  private officesCollection: AngularFirestoreCollection<Office>;

  offices: Observable<Office[]>;

  constructor(private readonly db: AngularFirestore) {
    this.officesCollection = db.collection<Office>('offices');
    this.offices = this.officesCollection.valueChanges({ idField: 'id' });
  }

  addOffice(name: string, location: string) {
    const id = this.db.createId();
    const now = firebase.firestore.FieldValue.serverTimestamp();
    const office: Office = { id, name, location, created_at: now, updated_at: now };
    this.officesCollection.doc(id).set(office);
  }

  deleteOffice(id: string) {
    this.officesCollection.doc(id).delete();
  }

  getOffice(id: string) {
    this.db.doc<Office>(`offices/${id}`).valueChanges({ idField: 'id' })
      .pipe(take(1))
      .subscribe(val => console.log(val));;
  }

  getAllOffices() {
    this.offices.pipe(take(1)).subscribe(val => console.log(val));
  }

  updateOffice(id: string, updates: any) {
    // console.log(updates);
    const { name, location } = updates;
    const now = firebase.firestore.FieldValue.serverTimestamp();
    if (typeof name === 'string' && typeof location === 'string') {
      this.officesCollection.doc(id).update({ name, location, updated_at: now });
    }
  }
}