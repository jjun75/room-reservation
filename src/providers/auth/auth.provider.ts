import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';
import { User } from '../../model/user';


@Injectable()
export class AuthProvider {

   constructor() {
   }


   userInfo(): any {
     return firebase.auth().currentUser;
   }

   /**
    * Use Firebase Web API signInWithEmailAndPassword method
    * to authenticate user login attempt
    *
    * @method loginWithEmailAndPassword
    * @param email    {string}      User e-mail address
    * @param password {string}      E-mail account password
    * @return {Promise}
    */
   loginWithEmailAndPassword(email: string, password  : string) : Promise<any> {
      return new Promise((resolve, reject) => {
         firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then((val : any) => {
            resolve(val);
         })
         .catch((error : any) => {
            reject(error);
         });
      });
   }

   /**
    * Log out with Firebase Web API signOut method
    *
    * @method logOut
    * @return {Promise}
    */
   logOut() : Promise<any> {
      return new Promise((resolve, reject) => {
        firebase
        .auth()
        .signOut()
        .then(() => {
           resolve(true);
        })
        .catch((error : any) => {
           reject(error);
        });
      });
   }

}
