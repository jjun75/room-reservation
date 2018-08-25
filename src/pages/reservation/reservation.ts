import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ReservationModel } from '../../model/reservation.model';

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
  public res: ReservationModel = new ReservationModel();
  public conferenceRooms = [
    {roomId: "01", roomName: "대회의실"},
    {roomId: "02", roomName: "소회의실"}
  ]

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams) {
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
}
