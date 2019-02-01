import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import { HomePage } from "../home/home";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  public langs;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public ToastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }

  onSubmit() {
    console.log(this.langs);
    localStorage.setItem("langue", this.langs);
    this.translate.instant(this.langs);
    this.presentToast();
    this.navCtrl.setRoot(HomePage);
  }

  presentToast() {
    let toast = this.ToastCtrl.create({
      message: this.translate.instant("page.setting.success"),
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
