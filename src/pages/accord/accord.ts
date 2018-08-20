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
  public index = ['DO', 'DO#', 'RE', 'RE#', 'MI', 'FA', 'FA#', 'SOL', 'SOL#', 'LA', 'LA#', 'SI','DO', 'DO#', 'RE', 'RE#', 'MI', 'FA'];
  public accordage = { index: 9, frequence: 440.0 };
  public indexLA: number = 9;
  public frequence: number = 440.0;
  public majeure = [0, 4, 7];
  public mineure = [0, 3, 7];
  public dominante7emeMaj = this.majeure.concat([10]);
  public dominante7emeMin = this.mineure.concat([10]);
  public notePlaying: boolean = false;

  public Octave = (note: any) => {
    let result: any[] = []
    const semitones = Math.round(12 * Math.log(note / 440) * Math.LOG2E)
    // console.log(semitones)
    for (let i = semitones; i < 18 - Math.abs(semitones); i++) {
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
    // console.log(this.note.frequence);



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccordPage');
    this.loadAccord();
    //console.log(this.note);
  }

  loadAccord() {
    let octave = this.Octave(this.note.frequence);
    if (this.note.gammeSelected == "M") {
      this.accord = this.dominante7emeMaj.map(note => octave[note]);
    } else {
      this.accord = this.dominante7emeMin.map(note => octave[note]);
    }
    this.accord.map(note => {
      console.log(note);
      this.note.oscillator = this.audioProvider.prepareFrequence(note.frequence);
      this.note.playing = false;
      //console.log(this.note);
    })
  }

  onPlay(note) {
    this.note = note;
    if (!this.note.playing) {
      this.note.oscillator = this.audioProvider.playFrequence(note.frequence);
      this.note.playing = true;
    } else {
      this.note.oscillator.stop();
      this.note.playing = false;
    }
  }

  ionViewWillLeave() {
    console.log(this.note);
    this.audioProvider.stopAll();
  }
}
