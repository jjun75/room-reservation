import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().onAuthStateChanged(loginUser => {
      if (loginUser) {
        this.user = {
          profileImage: "assets/imgs/avatar/girl-avatar.png",
          coverImage: "assets/imgs/background/background-2.jpg",
          team: "",
          name: "개발중",
          email: loginUser.email,
          dept: "Futurenuri",
          description: "Passionate Developer. Recently focusing on developing mobile hybrid apps and web development.",
          address: "서울특별시 영등포구 문래동5가 9번지 벽산디지털밸리 1102호"
        };
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }
}
