import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
   }
   getUid() {
     console.log(this.currentUser.uid);
     return this.currentUser.uid;
   }
   getAuthState() {
     return this.authState;
   }

   loginWithEmail() {
     return this.afAuth.auth.signInWithPopup(
       new firebase.auth.EmailAuthProvider()
     );
   }
   loginWithGoogle() {
     return this.afAuth.auth.signInWithPopup(
       new firebase.auth.GoogleAuthProvider()
     );
   }
     isLoggedIn() {
       if (this.currentUser == null) {
         return false;
       }
       return true;
     }
     logout() {
       this.afAuth.auth.signOut();
     }
     getName() {
      return this.currentUser.displayName;
     }
   }
