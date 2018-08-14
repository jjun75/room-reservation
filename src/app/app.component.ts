import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";

import * as firebase from 'firebase';
import { ConferencePage } from '../pages/conference/conference';

var config = {
  apiKey: "AIzaSyBZ3P9Oa_oonar_Cgti4L2_uOenFEAtJ5s",
  authDomain: "newson-5c00c.firebaseapp.com",
  databaseURL: "https://newson-5c00c.firebaseio.com",
  projectId: "newson-5c00c",
  storageBucket: "",
  messagingSenderId: "783096301455"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
       this.rootPage = ConferencePage;
      } else {
       this.rootPage = LoginPage;
      }
    });
  }
}

