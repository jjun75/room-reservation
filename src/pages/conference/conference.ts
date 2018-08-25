import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { ReservationModel } from '../../model/reservation.model';
import { ReservationPage } from '../../pages/reservation/reservation';
import { LoaderProvider } from '../../providers/loader/loader';
import  * as environments from '../../environments/environments';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { User } from '../../model/user';

/**
 * Generated class for the ConferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-conference',
  templateUrl: 'conference.html'
})
export class ConferencePage {
  public reservList: any;
  public selectedMenu: any;
  public selectedId: string;

  constructor(
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private storage: Storage,
        private loader: LoaderProvider,
        public navCtrl: NavController,
        public navParams: NavParams) {

    this.reservationList();

  }

  reservationList(){
    this.loader.show();
    const reservationRef = firebase.database().ref("reservation/");
    reservationRef.on('value',(items: any) => {
      if(items) {
        this.reservList = [];
        items.forEach(element => {
          var reservation = new ReservationModel();
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
    this.loader.hide();
    console.log(this.reservList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferencePage');
  }

  /**
   * 회의실 예약
   */
  roomReserve() {
    let modal = this.modalCtrl.create(ReservationPage);
    //modal 창이 닫히면서 데이터 전송되면 데이터를 DB에 저장 처리
    modal.onDidDismiss(data => {
      console.log(data);
      const postsRef = firebase.database().ref("reservation/");
      postsRef.push(data);
    });
    modal.present();
  }

  getRoomName(roomId: string): string {
    let idx = Number.parseInt(roomId);
    return environments.conferenceRoomCode[idx].roomId;
  }

  showConfirm(roomId) {
    this.selectedId = roomId;
    const confirm = this.alertCtrl.create({
      title: '미참석 사유',
      message: 'ic galaxy?',
      inputs: [
        {
          name: 'message',
          placeholder: '미참시 사유를 작성해주세요'
        }
      ],
      buttons: [
        {
          text: '취소',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '확인',
          handler: data => {
            console.log('Agree clicked'+ data.message);
            const postsRef = firebase.database().ref("reservation/"+roomId+"/messages/");
            let user: any;
            this.storage.get("user").then((data) => {
              user = data;
            });
            postsRef.update(
              { uid: user.uid,
                message: data.message}
            );
          }
        }
      ]
    });
    confirm.present();
  }
}
