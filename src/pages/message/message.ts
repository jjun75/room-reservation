import { ReservationModel } from './../../model/reservation.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';

import * as firebase from 'firebase';
import * as moment from 'moment';

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
  public reservation: ReservationModel;
  public messages: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loader: LoaderProvider ) {
    let reservation = this.navParams.get("reservation");
    this.initMessages(reservation);
  }

  initMessages(reservation: ReservationModel) {
    this.reservation = reservation;
    this.loader.show;
    const msgRef = firebase.database().ref("messages/").orderByChild('rid').equalTo(reservation.rid);
    msgRef.once('value', (data: any) => {
      if(data){
        data.forEach(element => {
          let message = {
            "key": element.key,
            "message": element.val().message,
            "uid": element.val().uid,
            "rid": element.val().rid,
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

  writeMessage() {
    //this.selectedId = reservation.rid;
    const confirm = this.alertCtrl.create({
      title: '미참석 사유',
      message: '미참석 사유를 작성해주세요.',
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
            let messageData = {
              rid: this.reservation.rid, //예약번호
              uid: user.uid, //comment 작성자 id
              message: data.message, //comment
              regDt: moment().format("YYYY-MM-DD HH:mm:ss"), //comment 작성 일시
            }
            firebase.database().ref("messages/"+mid).update(messageData);
            const messagesCntRef = firebase.database().ref("reservation/"+this.reservation.rid+"/messagesCnt");
            messagesCntRef.transaction((data) => {
              return data+1;
            });

            confirm.dismiss().then(() => {
              // this.navCtrl.pop().then(() => {
              //   console.log("message page close");
              //   // 다시 메세지 목록 호출
              //   //this.navCtrl.push("MessagePage", {"reservation": this.reservation} );
              // });
            });
            return false;
          }
        }
      ]
    });
    confirm.present();
  }

  deleteMessage(msg: any){
    const confirm = this.alertCtrl.create({
      title: '메세지 삭제',
      message: '삭제하시겠습니까?',
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
            console.log('Agree clicked : '+ msg.key);
            const result = firebase.database().ref("messages/"+msg.key).remove();
            const messagesCntRef = firebase.database().ref("reservation/"+this.reservation.rid+"/messagesCnt");
            messagesCntRef.transaction((data) => {
              return data-1;
            });

            confirm.dismiss().then(() => {
              let index = this.messages.indexOf(msg);
              this.messages.splice(index,1);

              // this.navCtrl.pop().then(() => {
              //   console.log("message page close");
              //   // 다시 메세지 목록 호출
              //   this.navCtrl.push("MessagePage", {"reservation": this.reservation} );
              // });
            });
            return false;
          }
        }
      ]
    });
    confirm.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

}
