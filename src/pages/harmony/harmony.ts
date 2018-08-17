import { Component } from '@angular/core';
import { Note } from '../../models/note.model';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteProvider } from '../../providers/note/note';
import { AudioProvider } from '../../providers/audio/audio';
import {AccordPage} from '../../pages/accord/accord';


@IonicPage()
@Component({
  selector: 'page-harmony',
  templateUrl: 'harmony.html',
})
export class HarmonyPage {
  /**
   * import en dur des data
   */
  //TODO faire nettoyage
  public notes: any;
  public index = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI'];
  public accordage = { index: 9, frequence: 440.0 };
  public indexLA: number = 9;
  public frequence : number = 440.0;
  public majeure = [0, 4, 7];
  public Dominante7eme = this.majeure.concat([10]);

  public Octave = (note: any) => {
    let result: any[] = []
    const semitones = Math.round(12 * Math.log(note / 440) * Math.LOG2E)
    // console.log(semitones)
    for (let i = semitones; i < 12 - Math.abs(semitones); i++) {
      //a verifier
      let index = (this.accordage.index + i) % 12;
      result.push({ index: this.index[index], frequence: 2 ** (i / 12) * 440 })
      // result.push(2 ** (j / 12) * 440)
    }
    return result
  }
  public octave: any[] = [];
  public noteSelected: boolean = false;
  public note: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public noteProvider: NoteProvider, public audioProvider: AudioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarmonyPage');
    this.notes = this.index;
    console.log(this.notes);
    
    this.octave = this.Octave(261.6255653005986)
    console.log( this.octave);
    
    
  }


  choixNote(note: any) {
    console.log(note);
    // this.audioProvider.stop()
    if (note != null) {
      this.noteSelected = true;
      this.navCtrl.push(AccordPage, {note: note})
    }


  }






}
