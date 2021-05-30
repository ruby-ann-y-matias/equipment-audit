import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { User, UserService } from './database/user.service';
import { Role, RoleService } from './database/role.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<any>;
  regUserRole: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.userService = userService;
    this.roleService = roleService;
    this.regUserRole = null;

    this.roleService.findRoleByName('regular').pipe(take(1))
      .subscribe((x: any) => this.getUserRole(x[0]));

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUserRole(role: Role) {
    this.regUserRole = role;
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    // console.log(credential.user);
    return this.updateUserData(credential.user, 'google');
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  async signUp(email: string, password: string, rememberLogin: boolean) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      // console.log(credential.user);
      if (rememberLogin) this.afAuth.setPersistence('local');
      return this.updateUserData(credential.user, 'email');
    } catch (e) {
      console.log(e);
    }
  }

  async signIn(email: string, password: string, rememberLogin: boolean) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      // console.log(credential.user);
      if (rememberLogin) this.afAuth.setPersistence('local');
      return this.updateUserData(credential.user, 'email');
    } catch (e) {
      console.log(e);
    }
  }

  private updateUserData({ uid, email, displayName, photoURL }: any, registrationType: string) {
    if (this.regUserRole) {
      const data = {
        uid,
        email,
        name: displayName = '',
        profile_image: photoURL = '',
        role_name: this.regUserRole.name,
        role_ref: `/roles/${this.regUserRole.id}`
      };

      this.userService.addOrUpdateUser(data, registrationType);
    }
  }
}
