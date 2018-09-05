import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Subject';
import * as environmet from '../environments/environments'
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any = new Subject();
  placeholder = 'assets/imgs/avatar/girl-avatar.png';
  chosenPicture: any;

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public app: App) {

    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home'},
      { title: 'ConferenceRoom', component: 'ConferencePage', active: false, icon: 'calendar'},
      { title: 'Logout', component: 'app', active: false, icon: 'power'},

    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
    this.initializeApp();

    firebase.initializeApp(environmet.config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = "HomePage"; //page 객체를 사용시 Lazy Loading 이 안됨.
      } else {
        this.rootPage = "WelcomePage";
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.global.set('theme', '');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.menuCtrl.enable(false, 'right');
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  backToWelcome() {
    // const root = this.app.getRootNav();
    // root.popToRoot();
    const root = this.app.getRootNavById('n4');
    this.rootPage = "WelcomePage";
  }

  logout() {
    this.storage.clear().then(() => {
      firebase.auth().signOut();
    });
    this.menu.close();
    //Api Token Logout
    //setTimeout(() => this.backToWelcome(), 1000);
    this.backToWelcome();
  }

  checkActive(page) {
    return page == this.activePage;
  }
}

