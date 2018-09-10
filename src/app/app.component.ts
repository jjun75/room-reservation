import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Subject';
import * as environmet from '../environments/environments'
import * as firebase from 'firebase';
import { AuthProvider } from '../providers/auth/auth.provider';
import { User } from '../model/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage: any = new Subject();
  placeholder = 'assets/imgs/avatar/girl-avatar.png';
  chosenPicture: any;
  user: User;
  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public authProvider: AuthProvider,
    public storage: Storage,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public app: App) {

    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home'},
      { title: 'Reservation', component: 'ConferencePage', active: false, icon: 'calendar'},
      { title: 'Settings', component: 'Settings', active: false, icon: 'settings'},

    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
    this.initializeApp();

    firebase.initializeApp(environmet.firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = new User();
        this.user.setId(user.uid);
        this.user.setEmail(user.email);
        // storage 에서 값 가져와 사용하기 안됨..좀더 분석후 적용
        // storage.get("username").then((data)=>{
        //   this.user.setName(data);
        //   console.log("storage user info : " + data);
        // });
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

  myProfile(){
    let page = { title: 'ProfilePage', component: 'ProfilePage', active: true, icon: 'profile'};
    this.nav.setRoot(page.component);
    this.splashScreen.hide();
  }


  checkActive(page) {
    return page == this.activePage;
  }
}

