import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { ReservationModel } from '../../model/reservation.model';
import { LoaderProvider } from '../../providers/loader/loader';
import  * as environments from '../../environments/environments';


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
  private limit: any = 10;

  public pageProperty = {
    name: "회의실 예약 목록",
    image: "assets/imgs/background/background-3.jpg"
  };

  constructor(
        private modalCtrl: ModalController,
        private storage: Storage,
        private loader: LoaderProvider,
        public navCtrl: NavController,
        public navParams: NavParams) {

    this.reservationList();

  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.limit = 10;
    
    this.reservationList();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.limit += 10;
    try{
      this.reservationList();
    }catch(e){
      console.log(e.message);
    }
    setTimeout(() => {
       infiniteScroll.complete();
    }, 500);
  }

  async reservationList(){
    const reservationRef = firebase.database().ref("reservation/").orderByChild('dispOrder').limitToFirst(this.limit);
    await reservationRef.once('value',(items: any) => {
      if(items) {
        this.reservList = [];
        let tmp = "";
        items.forEach(element => {
          var reservation = new ReservationModel();
          reservation.setRid(element.val().rid);
          reservation.setRoomId(element.val().roomId);
          reservation.setRoomName(element.val().roomName);
          reservation.setConferenceTitle(element.val().conferenceTitle);
          reservation.setConferenceContents(element.val().conferenceContents);
          let conferenceDate = element.val().conferenceDate;
          if(tmp !== conferenceDate){
            tmp = conferenceDate;
            reservation.setDisplay(true);
          }
          reservation.setConferenceDate(conferenceDate);
          let startTime = element.val().startTime;
          reservation.setStartTime(startTime);
          reservation.setEndTime(element.val().endTime);
          if(element.val().roomId === '01'){
            reservation.setIcon('woody');
          }else{
            reservation.setIcon('buzz');
          }
          reservation.setTime(startTime +" ~ "+element.val().endTime);
          reservation.setMessagesCnt(element.val().messagesCnt);


          this.reservList.push(reservation);
        });
      }else{
        console.log("no Result");
      }
    });
  }

  getMessages(rid: string): string {
      const messagesRef = firebase.database().ref("messages/");
      messagesRef.once('value',(items: any) => {

      });
      return "";

    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferencePage');
  }

  /**
   * 회의실 예약
   */
  roomReserve() {
    let modal = this.modalCtrl.create("ReservationPage");
    //modal 창이 닫히면서 데이터 전송되면 데이터를 DB에 저장 처리
    modal.onDidDismiss(data => {
      if(data){
        console.log(data);
        const key = firebase.database().ref("reservation/").push().key;
        data.setRid(key);
        let dispOrder = Number(data.conferenceDate.replace(/-/gi, "")+data.startTime.replace(/:/gi,""));
        data.setDispOrder(999999999999-dispOrder);
        this.writeReservation(key, data);
        this.writeAttendant(key, data.attendant);
      }
    });

    modal.present();

  }

  writeReservation(key: string, data: any) {
    console.log('writeReservationData:' + key);
    firebase.database().ref('/reservation/' + key ).update(data, error => {
      if (error) {
        console.log('database insert error : ' + error.message);
      }
    });
  }

  writeAttendant(key: string, data:any){
    console.log('writeAttendant:' + key);
    firebase.database().ref('/attendant/'+ key).set(data, error => {
      if (error) {
        console.log('database insert error : ' + error.message);
      } 
    });
  }

  getRoomName(roomId: string): string {
    let idx = Number.parseInt(roomId);
    return environments.conferenceRoomCode[idx].roomId;
  }

  viewMessages(reservation: ReservationModel) {
    this.navCtrl.push("MessagePage", {"reservation": reservation} );
  }

}
