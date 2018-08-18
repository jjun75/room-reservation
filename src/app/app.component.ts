import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as environmet from '../environments/environments'
import { WelcomePage } from "../pages/welcome/welcome";

import * as firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { ConferencePage } from '../pages/conference/conference';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public app: App) {
    this.pages = [
      {title:'ConferenceRoom', component: ConferencePage}
    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(environmet.config);
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
       this.rootPage = TabsPage;
      } else {
       this.rootPage = WelcomePage;
      }
    });
  }

  openPage(page){
    this.menu.close();
    this.nav.setRoot(page.component);
  }
  backToWelcome() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout() {
    //Api Token Logout
    localStorage.clear();
    //setTimeout(() => this.backToWelcome(), 1000);
    this.backToWelcome();
  }
}

