import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import firebase from 'firebase/app';

export interface Equipment {
  id: string,
  name: string,
  specs: string,
  office_name?: string, // the value of this should come from the office service
  office_ref?: string, // the value of this should come from the office service
  photo_url?: string,
  purchase_date?: any, // this should be in a format accepted by JS new Date()
  last_audited_at?: any, // this should be in a format accepted by JS new Date()
  created_at: any,
  updated_at: any
}

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  private equipmentCollection: AngularFirestoreCollection<Equipment>;

  equipment: Observable<Equipment[]>;

  constructor(private readonly db: AngularFirestore) {
    this.equipmentCollection = db.collection<Equipment>('equipment');
    this.equipment = this.equipmentCollection.valueChanges();
  }

  addEquipment(equipment: Equipment) {
    const { purchase_date, last_audited_at } = equipment;

    if (!!Date.parse(purchase_date) && !!Date.parse(last_audited_at)) {
      const newId = this.db.createId();
      const now = firebase.firestore.FieldValue.serverTimestamp();
      const purchaseDate = firebase.firestore.Timestamp.fromDate(new Date(purchase_date));
      const lastAuditedAt = firebase.firestore.Timestamp.fromDate(new Date(last_audited_at));

      const validatedEquipment = {
        ...equipment,
        id: newId,
        purchase_date: purchaseDate,
        last_audited_at: lastAuditedAt,
        created_at: now,
        updated_at: now
      };

      // console.log(validatedEquipment);
      this.equipmentCollection.doc(newId).set(validatedEquipment);
    }
  }

  deleteEquipment(id: string) {
    // if object not found, no error is thrown
    this.equipmentCollection.doc(id).delete();
  }

  findEquipmentByName(name: string) {
    return this.db.collection('equipment', ref => ref.where('name', '==', name)).valueChanges();
  }

  getEquipmentById(id: string) {
    return this.db.doc<Equipment>(`equipment/${id}`).valueChanges();
  }

  updateEquipment(id: string, updates: Equipment) {
    const now = firebase.firestore.FieldValue.serverTimestamp();
    const { purchase_date, last_audited_at } = updates;

    const validatedEquipment = {
      ...updates,
      id,
      updated_at: now
    };

    if (!!Date.parse(purchase_date)) {
      const purchaseDate = firebase.firestore.Timestamp.fromDate(new Date(purchase_date));
      validatedEquipment.purchase_date = purchaseDate;
    }

    if (!!Date.parse(last_audited_at)) {
      const lastAuditedAt = firebase.firestore.Timestamp.fromDate(new Date(last_audited_at));
      validatedEquipment.last_audited_at = lastAuditedAt;
    }

    delete validatedEquipment.created_at;
    // console.log(validatedEquipment);

    // if object is not found, will error, must catch
    this.equipmentCollection.doc(id).update(validatedEquipment)
      .then(() => {
        console.log('Updated');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
