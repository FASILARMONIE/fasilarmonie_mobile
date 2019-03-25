import { Component, OnInit } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { SpotifyProvider } from "../../providers/spotify/spotify";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import "rxjs/add/operator/map";
import { NoteProvider } from "../../providers/note/note";
import { AccordPage } from "../accord/accord";
import { TranslateService } from "@ngx-translate/core";
import { HomePage } from "../home/home";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {
  /* ancienne version */
  inputField: FormControl = new FormControl();
  public labels = new Array();

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
    "SI"
  ];

  /* nouvelle version */
  public trackData: FormGroup;
  public trackSearch: any;
  public searchList: Array<any>;
  public trackInfo = new Array();
  public keySearch: any;
  public accordage = { index: 9, frequence: 440.0 };

  public note: any;
  public noResult: Boolean = false;
  public userSearch: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public spotifyProvider: SpotifyProvider,
    public formBuilder: FormBuilder,
    public noteProvider: NoteProvider,
    public translate: TranslateService,
    public toastCtrl: ToastController
  ) {
    this.spotifyProvider.getToken();
    console.log(this.spotifyProvider.error);
    this.trackData = this.formBuilder.group({
      content: [""]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
    if (this.spotifyProvider.error === true) {
      this.navCtrl.setRoot(HomePage);
      this.presentToast();
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "une erreur est survenue, veuillez réessayer",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  /* nouvelle version */
  onSubmit() {
    if (this.trackData != null) {
      this.searchList = new Array<any>();
      console.log(this.trackData.value["content"]);
      this.userSearch = this.trackData.value["content"];
      this.spotifyProvider.getSearch(this.trackData.value["content"]).then(
        result => {
          if (result.length !== 0) {
            console.log(result);
            this.searchList = result;
            console.log(this.searchList);
          } else {
            this.noResult = true;
          }
        },
        error => {
          console.log("error");
        }
      );
    }
    this.trackData.reset();
  }

  getKeyFromSpotify(data: any) {
    switch (data) {
      case 0:
        return this.translate.instant("page.harmony.scaleNote.DO");
      case 1:
        return this.translate.instant("page.harmony.scaleNote.DO#");
      case 2:
        return this.translate.instant("page.harmony.scaleNote.RE");
      case 3:
        return this.translate.instant("page.harmony.scaleNote.RE#");
      case 4:
        return this.translate.instant("page.harmony.scaleNote.MI");
      case 5:
        return this.translate.instant("page.harmony.scaleNote.FA");
      case 6:
        return this.translate.instant("page.harmony.scaleNote.FA#");
      case 7:
        return this.translate.instant("page.harmony.scaleNote.SOL");
      case 8:
        return this.translate.instant("page.harmony.scaleNote.SOL#");
      case 9:
        return this.translate.instant("page.harmony.scaleNote.LA");
      case 10:
        return this.translate.instant("page.harmony.scaleNote.LA#");
      case 11:
        return this.translate.instant("page.harmony.scaleNote.SI");
      default:
        break;
    }
  }
  getModeFromSpotify(data: any) {
    switch (data) {
      case 0:
        return this.translate.instant("page.harmony.scaleGamme.mineur");
      case 1:
        return this.translate.instant("page.harmony.scaleGamme.majeur");
      default:
        break;
    }
  }

  goAccord(data: any) {
    this.note = { frequence: this.index[data.key], gammeSelected: data.mode };
    this.navCtrl.push(AccordPage, { note: this.note });
  }
}
