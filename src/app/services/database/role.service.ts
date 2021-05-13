import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/app';

interface Role {
  id: string,
  name: string,
  created_at: any,
  updated_at: any
}

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private rolesCollection: AngularFirestoreCollection<Role>;

  roles: Observable<Role[]>;

  constructor(private readonly db: AngularFirestore) {
    this.rolesCollection = db.collection<Role>('roles');
    this.roles = this.rolesCollection.valueChanges({ idField: 'id' });
  }

  addRole(name: string) {
    const id = this.db.createId();
    const now = firebase.firestore.FieldValue.serverTimestamp();
    const role: Role = { id, name, created_at: now, updated_at: now };
    this.rolesCollection.doc(id).set(role);
  }

  deleteRole(id: string) {
    // if object not found, no error is thrown
    this.rolesCollection.doc(id).delete();
  }

  getRole(id: string) {
    // if object not found, function param will just be console logged
    this.db.doc<Role>(`roles/${id}`).valueChanges({ idField: 'id' })
      .pipe(take(1))
      .subscribe(val => console.log(val));;
  }

  getAllRoles() {
    this.roles.pipe(take(1)).subscribe(val => console.log(val));
  }

  updateRole(id: string, updates: any) {
    // console.log(updates, name);
    const { name } = updates;
    const now = firebase.firestore.FieldValue.serverTimestamp();
    if (typeof name === 'string') {
      this.rolesCollection.doc(id).update({ name, updated_at: now });
    }
  }
}