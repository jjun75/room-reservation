import { Component, ModuleWithComponentFactories } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SignupPage } from "../../pages/signup/signup";
import { LoaderProvider } from '../../providers/loader/loader';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { User } from '../../model/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public user: User = new User();

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loader: LoaderProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  async login() {
    this.loader.show();
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        console.log("create user >>>>" + result.user.uid);
        this.user.id = result.user.uid;
        this.user.email = result.user.email;
        this.storage.set("user", this.user);
      } else {
        console.log("result false");
      }
    } catch (error) {
      let alert = this.alertCtrl.create({
        title: "Login Error",
        message: error.message,
        buttons: ["확인"]
      });
      alert.present();
    }
      this.loader.hide();
  }

  loginUserInfo(id: any): User {
    console.log('login id:'+ id);
    var user = new User();
    const userRef = firebase.database().ref('/users/' + id + '/');
    userRef.once('value', (items: any) => {
      if(items){
        console.log(items);
      }
    });
    return user;
  }

  // login() {
  //   this.loader.show();
  //   firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
  //     .then((result) => {
  //       console.log(result);
  //     }).catch((error) => {
  //       let alert = this.alertCtrl.create({
  //         title : "Login Error",
  //         message: error.message
  //       });
  //       alert.present();
  //     });
  //   this.loader.hide();
  // }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  resetEmail() {
    let alert = this.alertCtrl.create({
      title: 'Reset password',
      message: "패스워드를 재설정 링크를 받을 이메일 주소를 입력하여 주시기 바랍니다.",
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '확인',
          handler: data => {
            var emailAddress = data.email;
            firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
              let alert = this.alertCtrl.create({
                title: 'Password Reset email',
                subTitle: '사용자가 입력한 이메일로 패스워드 재설정 메일이 전송되었습니다. 확인하요 주시기 바랍니다.',
                buttons: ['확인']
              });
              alert.present();
            }).catch((error) => {
            });
          }
        }
      ]
    });
    alert.present();
  }
}
