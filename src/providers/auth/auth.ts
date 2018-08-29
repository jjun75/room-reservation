import firebase from "firebase";

export class AuthProvider {
    getLoginUser(){
        firebase.auth().currentUser;
    }
}