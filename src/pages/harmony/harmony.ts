import { Component } from '@angular/core';
import { Note } from '../../models/note.model';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoteProvider } from '../../providers/note/note';
import { AudioProvider } from '../../providers/audio/audio';
import { AccordPage } from '../../pages/accord/accord';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  public frequence: number = 440.0;
  public majeure = [0, 4, 7];
  public mineure = [0, 3, 7];
  /* public dominante7emeMaj = this.majeure.concat([10]);
  public dominante7emeMin = this.mineure.concat([10]); */

  public Octave = (note: any) => {
    let result: any[] = []
    const semitones = Math.round(12 * Math.log(note / 440) * Math.LOG2E)
    for (let i = semitones; i < 12 - Math.abs(semitones); i++) {
      let index = (this.accordage.index + i) % 12;
      result.push({ index: this.index[index], frequence: 2 ** (i / 12) * 440 })
    }
    return result
  }
  public octave: any[] = [];
  public noteSelected: any;
  public gammeSelected: any;

  public tonaliteData: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public noteProvider: NoteProvider, public audioProvider: AudioProvider, private FormBuilder: FormBuilder) {
    this.tonaliteData = this.FormBuilder.group({
      note: [''],
      gammeSelected: ['']
    })

    console.log(this.tonaliteData);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HarmonyPage');
    this.octave = this.Octave(261.6255653005986)
  }


  choixNote(note: any) {
    console.log(note);
    this.navCtrl.push(AccordPage, { note: note })
  }


  onSubmit() {
    if (this.tonaliteData.valid) {
      console.log(this.tonaliteData);
      
    }
  }



}
