import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User as FireBaseUser, auth } from 'firebase/app';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  user: User;

  constructor(public afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe((user: FireBaseUser) => {
      if(user) {
        this.createUser(user)
      }
    });
  }

  createUser = (user: FireBaseUser) => {
    this.user = new User(user.displayName ? user.displayName : user.email);
    this.user.photoUrl = user.photoURL;
  }

  googleLogin = (): void => {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()
      .setCustomParameters({
        prompt: 'select_account'
      })
    ).then((data: auth.UserCredential) => data.additionalUserInfo.isNewUser && this.createUser(data.user));
  }

  logout = () => {
    this.afAuth.auth.signOut();
    this.user = null;
  }

}
