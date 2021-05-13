import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';

interface Equipment {
  id: string,
  name: string,
  specs: string,
  office_name: string, // the value of this should come from the office service
  office_ref: string, // the value of this should come from the office service
  purchase_date: any, // this should be in a format accepted by JS new Date()
  last_audited_at: any, // this should be in a format accepted by JS new Date()
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
    this.equipment = this.equipmentCollection.valueChanges({ idField: 'id' });
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

  getEquipment(id: string) {
    // if object not found, function param will just be console logged
    this.db.doc<Equipment>(`equipment/${id}`).valueChanges({ idField: 'id' })
      .pipe(take(1))
      .subscribe(val => console.log(val));
  }

  getAllEquipment() {
    this.equipment.pipe(take(1)).subscribe(val => console.log(val));
  }

  updateEquipment(id: string, updates: Equipment) {
    // if object is not found, will error, must catch
    const { purchase_date, last_audited_at } = updates;

    if (!!Date.parse(purchase_date) && !!Date.parse(last_audited_at)) {
      const now = firebase.firestore.FieldValue.serverTimestamp();
      const purchaseDate = firebase.firestore.Timestamp.fromDate(new Date(purchase_date));
      const lastAuditedAt = firebase.firestore.Timestamp.fromDate(new Date(last_audited_at));

      const validatedEquipment = {
        ...updates,
        id,
        purchase_date: purchaseDate,
        last_audited_at: lastAuditedAt,
        updated_at: now
      };

      delete validatedEquipment.created_at;
      // console.log(validatedEquipment);

      this.equipmentCollection.doc(id).update(validatedEquipment)
        .then(() => {
          console.log('Updated');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
