import { Component } from '@angular/core';
import { Note} from '../../models/note.model';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteProvider } from '../../providers/note/note';

@IonicPage()
@Component({
  selector: 'page-harmony',
  templateUrl: 'harmony.html',
})
export class HarmonyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public note: NoteProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarmonyPage');
  }



}
