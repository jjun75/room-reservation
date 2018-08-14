import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoaderProvider } from '../../providers/loader/loader';

import * as firebase from 'firebase';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private account: any = {
    id: '',
    empNo: '',
    dept: '',
    name: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
    private loader: LoaderProvider,
    public navParams: NavParams) {
  }

  /**
   * signup 버튼 클릭시 실행되는 이벤트 함수
   */
  async signup() {
    this.loader.show();
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password);
      if (result) {
        var createUser = {
          empNo: this.account.empNo,
          dept: this.account.dept,
          name: this.account.name,
          email: this.account.email,
          date: moment().format('YYYYMMDDhhmmss'),
          id: result.user.uid,
        }
        this.writeUserData(createUser);
      } else {

      }
    } catch (error) {
      var errorMessage = error.message;
      console.log(errorMessage);
    }

    this.loader.hide();
  }

  writeUserData(user: any) {
    console.log('writeUserData:' + user.empNo);
    firebase.database().ref('/users/' + user.id ).set(user, error => {
      if (error) {
        // The write failed...
        console.log('database insert error : ' + error.message);
      } else {
        // Data saved successfully!
        console.log('database insert success');
      }
    });
  }
}
