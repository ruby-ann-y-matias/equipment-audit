import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Office } from 'src/app/shared/model/office';
import { Role } from 'src/app/shared/model/role';
import { Equipment } from 'src/app/shared/model/equipment';
import { User } from 'src/app/shared/model/user';


@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private rolesCollection: AngularFirestoreCollection<Role>;

  offices: Observable<Office[]>;
  roles: Observable<Role[]>;
  users: Observable<User[]>;
  equipment: Observable<Equipment[]>;

  constructor(private readonly db: AngularFirestore) {
    this.equipment = db.collection('equipment').valueChanges();
    this.users = db.collection('users').valueChanges();
    this.offices = db.collection('offices').valueChanges();

    this.rolesCollection = db.collection<Role>('roles');
    this.roles = this.rolesCollection.valueChanges();
  }

  addRole(name: string) {
    const id = this.db.createId();
    const now = firebase.firestore.FieldValue.serverTimestamp();
    const role: Role = { name, created_at: now, updated_at: now };
    this.rolesCollection.doc(id).set(role);
  }

  deleteRole(id: string) {
    this.rolesCollection.doc(id).delete();
  }

  getRole(id: string) {
    this.db.doc<Role>(`roles/${id}`).valueChanges()
      .pipe(take(1))
      .subscribe(val => console.log(val));;
  }

  getAllRoles() {
    this.roles.pipe(take(1)).subscribe(val => console.log(val));
  }

  updateRole(id: string, updates: object) {
    const name  = updates;
    const now = firebase.firestore.FieldValue.serverTimestamp();
    // console.log(updates, name);
    if (typeof name === 'string') {
      this.rolesCollection.doc(id).update({ name, updated_at: now });
    }
  }
}
