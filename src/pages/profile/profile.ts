import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  public user = {
    name: "Hong, gil-dong",
    profileImage: "assets/imgs/avatar/girl-avatar.png",
    coverImage: "assets/imgs/background/background-2.jpg",
    occupation: "Developer",
    location: "Futurenuri",
    description:
      "Passionate Developer. Recently focusing on developing mobile hybrid apps and web development.",
    address: "서울특별시 영등포구 문래동5가 9번지 벽산디지털밸리 1102호",
    phone: "555 555 555",
    email: "admin@futurenuri.com",
    whatsapp: "555 555 555"
  };


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");
  }
}
