import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import firebase from 'firebase/app';

export interface Office {
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
    this.offices = this.officesCollection.valueChanges();
  }

  addOffice(office: Office) {
    const newId = this.db.createId();
    const now = firebase.firestore.FieldValue.serverTimestamp();

    const validatedOffice = {
      ...office,
      id: newId,
      created_at: now,
      updated_at: now
    }

    this.officesCollection.doc(newId).set(validatedOffice);
  }

  deleteOffice(id: string) {
    // if object not found, no error is thrown
    this.officesCollection.doc(id).delete();
  }

  findOfficeByName(name: string) {
    return this.db.collection('offices', ref => ref.where('name', '==', name)).valueChanges();
  }

  getOfficeById(id: string) {
    return this.db.doc<Office>(`offices/${id}`).valueChanges();
  }

  updateOffice(id: string, updates: Office) {
    const now = firebase.firestore.FieldValue.serverTimestamp();

    const validatedOffice = {
      ...updates,
      id,
      updated_at: now
    }

    delete validatedOffice.created_at;
    console.log(validatedOffice);

    this.officesCollection.doc(id).update(validatedOffice)
      .then(() => {
        console.log('Updated');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}