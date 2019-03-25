import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
//import provider
import { AudioProvider } from "../../providers/audio/audio";
import { HomePage } from "../home/home";
import { TranslateService } from "@ngx-translate/core";
import { stringify } from "@angular/core/src/util";

//import model

/**
 * Generated class for the AccordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-accord",
  templateUrl: "accord.html"
})
export class AccordPage {
  /**
   * import en dur des data
   */
  //TODO faire nettoyage
  public notes: any;
  public index = [
    "DO",
    "DO#",
    "RE",
    "RE#",
    "MI",
    "FA",
    "FA#",
    "SOL",
    "SOL#",
    "LA",
    "LA#",
    "SI",
    "DO",
    "DO#",
    "RE",
    "RE#",
    "MI",
    "FA"
  ];
  public voices = ["Basse", "Ténor", "Alto", "Soprano"];
  public accordage = { index: 9, frequence: 440.0 };
  public frequence: number = 440.0;
  public majeure = [0, 4, 7];
  public mineure = [0, 3, 7];
  public dominante7emeMaj = this.majeure.concat([10]);
  public dominante7emeMin = this.mineure.concat([10]);
  public notePlaying: boolean = false;
  public nbOctave = [55, 110, 220, 440, 880, 1780];
  // public nbOctave = [{1:55},{2:110}, {3:220}, {4:440}, {5:880}, {6:1780}];
  public nbOctaveIndex = 3;
  public octaveRef: Boolean = true;
  public octaveUp: Boolean = false;
  public octaveDown: Boolean = false;

  public octave: any[] = [];
  //declaration necessaire
  public note: any;
  public noteSelected: any;
  public accord: any[] = [];
  public notePlayed: boolean = false;
  public noteActive: Array<any>;
  public userStop: boolean;

  public Octave = (note: any) => {
    let result: any[] = [];
    const semitones = Math.round(12 * Math.log(note / 440) * Math.LOG2E);
    for (let i = semitones; i < 12 - Math.abs(semitones); i++) {
      let index = (this.accordage.index + i) % 12;
      result.push({ index: this.index[index], frequence: 2 ** (i / 12) * 440 });
    }
    return result;
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public audioProvider: AudioProvider,
    public translate: TranslateService
  ) {
    this.note = this.navParams.get("note");
    console.log(this.note);
    console.log(this.nbOctave[3]);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AccordPage");
   this.initHarmony();
  }

  initHarmony() {
    this.octave = this.Octave(261.6255653005986);
    this.loadAccord(this.note);
    this.audioProvider.prepareAudioContext();
  }

  public methodeOctave(note: any) {
    let result: any[] = [];
    const semitones = Math.round(12 * Math.log(note / 440) * Math.LOG2E);
    // console.log(semitones)
    for (let i = semitones; i < 18 - Math.abs(semitones); i++) {
      let index = (this.accordage.index + i) % 12;
      result.push({
        index: this.index[index],
        frequence: 2 ** (i / 12) * this.nbOctave[this.nbOctaveIndex]
      });
      console.log(this.nbOctaveIndex);
    }
    return result;
  }

  loadAccord(note) {
    if (typeof note.frequence == "string") {
      /* for (let index = 0; index < this.octave.length; index++) {
       if(this.octave[index].include(this.note.frequence))

      } */
      this.octave.forEach(element => {
        console.log(element);
        if (element.index == this.note.frequence) {
          this.note = {
            frequence: element.frequence,
            gammeSelected: this.note.gammeSelected
          };
          console.log(element.frequence);
          console.log(this.note);
        }
      });
    } else {
      this.note = note;
    }

    this.octave = this.methodeOctave(this.note.frequence);
   // console.log(this.octave);
    if (this.note.gammeSelected == 1) {
      console.log("Majeure");
      this.accord = this.dominante7emeMaj.map(note => this.octave[note]);
    } else {
      console.log("mineure");
      this.accord = this.dominante7emeMin.map(note => this.octave[note]);
    }
    this.accord.map(note => {
      console.log(note);
      this.note.oscillator = this.audioProvider.prepareFrequence(
        note.frequence
      );
      //this.noteSelected.playing = false;
      //console.log(this.note);
    });
  }

  onPlay(note) {
    // this.audioProvider.prepareAudioContext();
    this.userStop = false;
    console.log(note);
    //console.log(note.active);
    this.noteSelected = note;
    if (!this.noteSelected.playing) {
      console.log(this.noteSelected);

      this.noteSelected.oscillator = this.audioProvider.playFrequence(
        note.frequence
      );
      this.noteSelected.playing = true;
      this.notePlayed = true;
      note.active = !note.active;
    } else {
      this.noteSelected.oscillator.stop();
      this.noteSelected.playing = false;
      this.notePlayed = false;
      note.active = !note.active;
    }
  }

  /* onPlay(note) {
    this.note = note;
    if (!this.note.playing) {
      this.note.oscillator = this.audioProvider.playFrequence(note.frequence);
      this.note.playing = true;
    } else {
      this.note.oscillator.stop();
      this.note.playing = false;
    }
  } */
  realeaseHarmony() {
    this.octave = this.Octave(261.6255653005986);
    this.loadAccord(this.note);
   // this.audioProvider.prepareAudioContext();
   this.audioProvider.prepareFrequence();
  }

  downOctave($event: any) {
    if ($event != null) {
      this.audioProvider.stop();
      this.nbOctaveIndex = 2;
      this.octaveRef = false;
      this.octaveUp = false;
      this.octaveDown = true;
    }
    this.realeaseHarmony();
  }
  originOctave($event: any) {
    if ($event != null) {
      this.audioProvider.stop();
      this.nbOctaveIndex = 3;
      console.log(this.nbOctaveIndex);

      this.octaveDown = false;
      this.octaveUp = false;
      if (!this.octaveRef) {
        this.octaveRef = true;
      }
    }
    this.realeaseHarmony();
  }

  upOctave($event: any) {
    if ($event != null) {
      this.audioProvider.stop();
     // this.audioProvider.close();
      this.nbOctaveIndex = 4;
      console.log(this.nbOctaveIndex);
      this.octaveRef = false;
      this.octaveUp = true;
      this.octaveDown = false;
    }
    this.realeaseHarmony();
  }

  stopButton(accord) {
    console.log(this.accord);
    this.accord.forEach(note => {
      if (note.active) {
        note.active = !note.active;
      }
    });

    // this.userStop = true;
    console.log(this.note);
    this.audioProvider.stop();
    //this.initHarmony();
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewWillLeave() {
    console.log(this.note);
    this.audioProvider.stopAll();
  }
}
