import { ReservationModel } from './../../model/reservation.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';

import * as firebase from 'firebase';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  public messages: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loader: LoaderProvider ) {
    let reservation = this.navParams.get("reservation");
    this.initMessages(reservation);
  }

  initMessages(reservation: ReservationModel) {
    this.loader.show;
    const msgRef = firebase.database().ref("messages/").orderByChild('regDt');
    msgRef.once('value', (data: any) => {
      if(data){
        data.forEach(element => {
          let message = {
            "message": element.val().message,
            "uid": element.val().uid,
            "regDt": element.val().regDt
          };
          this.messages.push(message);
        });

      }else{
        console.log("no result");
      }
    });

    this.loader.hide;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
