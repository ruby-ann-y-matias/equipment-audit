import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import firebase from 'firebase/app';

export interface User {
  uid: string,
  name: string,
  email: string,
  profile_image: string,
  role_name?: string,
  role_ref?: string,
  office_name?: string,
  office_ref?: string,
  last_activity_url?: string,
  last_activity_at?: any,
  created_at?: any,
  updated_at?: any
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;

  users: Observable<User[]>;

  constructor(private readonly db: AngularFirestore) {
    this.usersCollection = db.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  addOrUpdateUser(user: User, registrationType: string) {
    const now = firebase.firestore.FieldValue.serverTimestamp();

    this.findUserByEmail(user.email).pipe(take(1))
      .subscribe((x: any) => {
        if (x.length === 0) {
          this.addUser({...user, office_name: '', office_ref: ''});
        } else {
          // TO-DO: CHECK ROLE SUBMITTED VS EXISTING ROLE LATER
           if (registrationType === 'email') {
            // for non-SNS, retain db profile_image and name
            this.updateUser(x[0].uid, {
              ...x[0],
              ...user,
              name: x[0].name,
              profile_image: x[0].profile_image
            });
          } else {
            // otherwise, save latest profile_image and name from SNS
            this.updateUser(x[0].uid, {...x[0], ...user});
          }
        }
      });
  }

  addUser(user: User) {
    const now = firebase.firestore.FieldValue.serverTimestamp();

    const validatedUser = {
      ...user,
      last_activity_at: now,
      last_activity_url: '/register',
      created_at: now,
      updated_at: now
    };

    this.usersCollection.doc(user.uid).set(validatedUser);
  }

  deleteUser(id: string) {
    // if object not found, no error is thrown
    this.usersCollection.doc(id).delete();
  }

  findUserByName(name: string) {
    return this.db.collection('users', ref => ref.where('name', '==', name)).valueChanges();
  }

  findUserByEmail(email: string) {
    return this.db.collection('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  getUserById(uid: string) {
    return this.db.doc<User>(`users/${uid}`).valueChanges();
  }

  updateUser(uid: string, updates: User) {
    const now = firebase.firestore.FieldValue.serverTimestamp();

    const validatedUser = {
      ...updates,
      last_activity_at: now,
      last_activity_url: '/edit', // to get referrer url later
      updated_at: now
    };

    delete validatedUser.created_at;
    // console.log(validatedUser);

    this.usersCollection.doc(uid).update(validatedUser)
      .then(() => {
        console.log('Updated');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}