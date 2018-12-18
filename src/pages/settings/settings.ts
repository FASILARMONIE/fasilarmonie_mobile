import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private langForm;
  private langs;
  constructor(public navCtrl: NavController, public navParams: NavParams, private FormBuilder: FormBuilder, public translate: TranslateService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onSubmit() {
    console.log(this.langs);
    localStorage.setItem('langue', this.langs);
    this.translate.instant(this.langs);
    this.navCtrl.setRoot(HomePage);
//TODO toastCtrl langue ok
  }

}
