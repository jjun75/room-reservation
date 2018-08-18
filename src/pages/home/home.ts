import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, App } from 'ionic-angular';

import { Reservation } from '../../model/Reservation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public app: App) {
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

    /**
   * Navigate to the detail page for this item.
   */
  openItem(reservation: Reservation) {
    this.navCtrl.push('ConferencePage', {

    });
  }
}
