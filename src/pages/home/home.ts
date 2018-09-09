import { AuthProvider } from './../../providers/auth/auth.provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ReservationModel } from '../../model/reservation.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public estateProperty = {
    name: '회의실 예약 시스템',
    image: 'assets/imgs/background/background-6.jpg',
 };

  constructor(
    private storage: Storage,
    private authProvider: AuthProvider,
    private app: App,
    public navCtrl: NavController) {
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

    /**
   * Navigate to the detail page for this item.
   */
  openItem(reservation: ReservationModel) {
    this.navCtrl.push('ConferencePage', {

    });
  }

  logout() {
    this.storage.clear().then(() => {
      this.authProvider.logOut();
    });
    //Api Token Logout
    //setTimeout(() => this.backToWelcome(), 1000);
    this.backToWelcome();
  }

  backToWelcome() {
    // const root = this.app.getRootNav();
    // root.popToRoot();
    const root = this.app.getRootNavById('n4');
    this.navCtrl.push("WelcomePage");
  }

}
