import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import * as moment from 'moment';
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
    const reservationRef = firebase.database().ref("reservation/").orderByChild('dispOrder');
    reservationRef.on('value',(items: any) => {
      if(items) {
        this.reservList = [];
        items.forEach(element => {
          var reservation = new ReservationModel();
          reservation.setRid(element.val().rid);
          reservation.setRoomId(element.val().roomId);
          reservation.setRoomName(element.val().roomName);
          reservation.setConferenceTitle(element.val().conferenceTitle);
          reservation.setConferenceContents(element.val().conferenceContents);
          let conferenceDate = element.val().conferenceDate;
          reservation.setConferenceDate(conferenceDate);
          let startTime = element.val().startTime;
          reservation.setStartTime(startTime);
          reservation.setEndTime(element.val().endTime);
          if(element.val().roomId === '01'){
            reservation.setIcon('calendar');
          }else{
            reservation.setIcon('cafe');
          }
          reservation.setTime({title: element.val().startTime, subtitle: element.val().conferenceDate });
          reservation.setMessagesCnt(element.val().messagesCnt);


          this.reservList.push(reservation);
        });
      }else{
        console.log("no Result");
      }
    });

    this.loader.hide();
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
        console.log('>>>>>>>>>>> order >>>>>>>>>>> '+dispOrder);
        data.setDispOrder(999999999999-dispOrder);
        this.writeReservationData(key, data);
      }
    });

    modal.present();

  }

  writeReservationData(key: string, data: any) {
    console.log('writeReservationData:' + key);
    firebase.database().ref('/reservation/' + key ).update(data, error => {
      if (error) {
        console.log('database insert error : ' + error.message);
      } else {
        console.log('database insert success');
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
  writeMessage(reservation: ReservationModel) {
    this.selectedId = reservation.rid;
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
            console.log('Agree clicked : '+ data.message);
            var user = firebase.auth().currentUser;
            const mid = firebase.database().ref("messages/").push().key;
            // 한개의 레코드 저장
            // firebase.database().ref("messages/"+mid).set(
            //   { rid: rid, //예약번호
            //     uid: user.uid, //comment 작성자 id
            //     message: data.message, //comment
            //     regDt: moment().format("YYYY-MM-DD HH:mm:ss"), //comment 작성 일시
            //   }
            // );

            // 두개의 레코드를 업데이트
            // 하지만 아래처럼 사용하면 update 경로로 잡힌 데이터가 통채로 변경됨
            // firebase.database().ref("reservation/"+this.selectedId).update({messagesCnt: 5}); 와같이 ref경로를 잡아주어야 함.
            // var updates = {};
            // let messageData = { rid: this.selectedId, //예약번호
            //   uid: user.uid, //comment 작성자 id
            //   message: data.message, //comment
            //   regDt: moment().format("YYYY-MM-DD HH:mm:ss"), //comment 작성 일시
            // }
            // let countData = {messagesCnt: reservation.getMessagesCnt()+1};
            // console.log("messages count is : "+ reservation.getMessagesCnt()+1);
            // updates["/messages/"+mid] = messageData;
            // updates["/reservation/"+this.selectedId] = countData;
            // firebase.database().ref().update(updates);

            var updates = {};
            let messageData = { rid: this.selectedId, //예약번호
              uid: user.uid, //comment 작성자 id
              message: data.message, //comment
              regDt: moment().format("YYYY-MM-DD HH:mm:ss"), //comment 작성 일시
            }
            firebase.database().ref("messages/"+mid).update(messageData);
            const messagesCntRef = firebase.database().ref("reservation/"+this.selectedId+"/messagesCnt");
            messagesCntRef.transaction((data) => {
              return data+1;
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
