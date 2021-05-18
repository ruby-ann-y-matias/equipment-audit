import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import firebase from 'firebase/app';

export interface Role {
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
    this.roles = this.rolesCollection.valueChanges();
  }

  addRole(role: Role) {
    const newId = this.db.createId();
    const now = firebase.firestore.FieldValue.serverTimestamp();

    const validatedRole = {
      ...role,
      id: newId,
      created_at: now,
      updated_at: now
    };

    this.rolesCollection.doc(newId).set(validatedRole);
  }

  deleteRole(id: string) {
    // if object not found, no error is thrown
    this.rolesCollection.doc(id).delete();
  }

  findRoleByName(name: string) {
    return this.db.collection('roles', ref => ref.where('name', '==', name)).valueChanges();
  }

  getRoleById(id: string) {
    return this.db.doc<Role>(`roles/${id}`).valueChanges({ idField: 'id' });
  }

  updateRole(id: string, updates: Role) {
    const now = firebase.firestore.FieldValue.serverTimestamp();

    const validatedRole = {
      ...updates,
      id,
      updated_at: now
    };

    delete validatedRole.created_at;
    // console.log(validatedRole);

    this.rolesCollection.doc(id).update(validatedRole)
      .then(() => {
        console.log('Updated');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}