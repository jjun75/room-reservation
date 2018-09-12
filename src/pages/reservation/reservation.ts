import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { ReservationModel } from '../../model/reservation.model';
import { LoaderProvider } from '../../providers/loader/loader';
import * as firebase from 'firebase';
import { User } from '../../model/user';
/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {
  res: ReservationModel;
  conferenceRooms: any;
  selectOptions: any;
  members: any;
  attendant: any;
  sendMail: any;

  constructor(
    private loader: LoaderProvider,
    public platform: Platform,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.selectOptions = {
        title: "참석자를 선택해주세요",
        subTitle: "참석자에게 메일을 발송할 수 있습니다."
      };
      this.conferenceRooms = [
        {roomId: "01", roomName: "대회의실"},
        {roomId: "02", roomName: "소회의실"}
      ];
      this.res = new ReservationModel();
      this.reservationList();
      this.attendant = "";
      if(this.platform.is('android')){
        this.sendMail = true;
      }else{
        this.sendMail = false;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  reserve(){
    console.log('room reserve');
    this.viewCtrl.dismiss(this.res);
  }

  cancel(){
    this.navCtrl.pop();
  }

  monthChange(val: any) {
    console.log('Month Change:', val);
  }

  yearChange(val: any) {
    console.log('Year Change:', val);
  }

  reservationList(){
    this.loader.show();
    const reservationRef = firebase.database().ref("users/").orderByChild('name');
    reservationRef.on('value',(items: any) => {
      if(items) {
        this.members = [];
        items.forEach(element => {
          var user = new User();
          user.setEmail(element.val().email);
          user.setName(element.val().name);
          this.members.push(user);
        });
      }else{
        console.log("no Result");
      }
    });

    this.loader.hide();
  }
}
