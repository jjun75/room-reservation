import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Reservation } from '../../model/Reservation';
import { ReservationPage } from '../../pages/reservation/reservation';

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

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
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
          reservation.setConferenceTitle(element.val().conferenceTitle);
          reservation.setConferenceContents(element.val().conferenceContents);
          reservation.setConferenceDate(element.val().conferenceDate);
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

  roomReservation() {
    let modal = this.modalCtrl.create(ReservationPage);
    //modal 창이 닫히면서 데이터 전송되면 데이터를 DB에 저장 처리
    modal.onDidDismiss(data => {

    });
    modal.present();
  }
}
