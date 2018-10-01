import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  public searchList: any;
  public labels: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
this.searchList = this.navParams.get("tracks");
 console.log(this.searchList);
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
     /* this.searchList.forEach(element => {
      console.log(element);
      this.labels.push(element)
    });  */
  }
  




}
