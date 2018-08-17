import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import provider
import { AudioProvider } from '../../providers/audio/audio';

//import model




/**
 * Generated class for the AccordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accord',
  templateUrl: 'accord.html',
})
export class AccordPage {

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
  //declaration necessaire
  public note: any;
  public accord: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public audioProvider: AudioProvider) {
    this.note = this.navParams.get('note');
    console.log(this.note.frequence);
    console.log(this.note);
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccordPage');
   // this.loadAccord();
  }

  loadAccord() {
// let octave = this.Octave(this.note.frequence);
let octave = this.Octave(this.note);
    this.accord = this.Dominante7eme.map(note => octave[note]);
    this.accord.map(note => {
console.log(note);

      // note.oscillator = this.audioProvider.playFrequence(note.frequence);
      // note.playing = true;
    })
  }

}
