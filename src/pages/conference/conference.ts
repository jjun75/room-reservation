import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Reservation } from '../../model/Reservation';

/**
 * Generated class for the ConferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conference',
  templateUrl: 'conference.html',
})
export class ConferencePage {
  public reservList: any;
  public selectedMenu: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reservationList();
  }

  reservationList(){
    this.reservList = [];
    const reservationRef = firebase.database().ref("reservation/");
    reservationRef.on('value',(items: any) => {
      if(items) {
        console.log("result size : " + items.length);
        items.forEach(element => {
          var reservation = new Reservation();
          reservation.setRoomId(element.val().roomId);
          reservation.setRoomName(element.val().roomName);
          reservation.setConferenceTitle(element.val().converenceTitle);
          reservation.setConferenceContents(element.val().setConferenceContents);
          reservation.setConferenceDate(element.val().setConferenceDate);
          reservation.setStartTime(element.val().startTime);
          reservation.setEndTime(element.val().endTime);
          this.reservList.push(reservation);
        });
      }else{
        console.log("no Result");
      }
    });
    console.log(this.reservList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferencePage');
  }

  openPage(selectedPage) {
    this.selectedMenu = selectedPage;
  }
}
