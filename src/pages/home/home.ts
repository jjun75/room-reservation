import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';

import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userName : any;
  private userEmail : any;
  private userId : any;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController) {
  }

  logout(){

    let confirm = this.alertCtrl.create({
      title: 'Log out ',
      message: 'log out 하시겠습니까 ?',
      buttons: [
        {
          text: '아니오',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '예',
          handler: () => {
            firebase.auth().signOut().then(() => {
              console.log("log out");
            }).catch( (error) => {
              console.log("log out errror");
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
