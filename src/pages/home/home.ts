import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { SearchPage } from '../search/search';
import { HarmonyPage } from '../harmony/harmony';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public translate: TranslateService) {

  }

  goToAboutPage() {
    this.navCtrl.push(AboutPage);
  }

  onHarmony(){
    this.navCtrl.push(HarmonyPage);
  }

  onSearch(){
    this.navCtrl.push(SearchPage)
  }
}
