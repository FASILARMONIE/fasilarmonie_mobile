import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpotifyProvider } from '../../providers/spotify/spotify';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { SearchSpotifyProvider } from '../../providers/search-spotify/search-spotify';
import 'rxjs/add/operator/map';
import { SearchResultPage } from '../search-result/search-result';
import { NoteProvider } from '../../providers/note/note';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  /* ancienne version */
  inputField: FormControl = new FormControl();
  public labels = new Array();


  /* nouvelle version */
  private trackData: FormGroup;
  public trackSearch: any;
  public searchList: any;
  public id: boolean = false;
  public key: any;
  public mode: any;
  public trackInfo = new Array();
  public keySearch: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public spotifyProvider: SpotifyProvider, private searchSpotifyProvider: SearchSpotifyProvider, public formBuilder: FormBuilder, public noteProvider: NoteProvider) {
    this.spotifyProvider.getToken();
    this.trackData = this.formBuilder.group({
      content: [''],
    })
    console.log(this.trackData.value);


  }
  /* ancienne version */
  /* ngOnInit() {
    this.inputField.valueChanges.subscribe(inputField => this.spotifyProvider.getSearch(inputField).subscribe(result => {
    }));
    this.searchList = this.spotifyProvider.searchList;
    console.log(this.searchList);
    this.searchList.forEach(element => {
      console.log(element);
      this.labels.push(element)
    });
  }
 */
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  /* nouvelle version */
  onSubmit() {
    if (this.trackData != null) {
      console.log(this.trackData.value["content"]);

      this.trackSearch = this.trackData.value["content"];
      this.spotifyProvider.getSearch(this.trackSearch).then(result => {
        console.log(result);
        this.searchList = result.tracks.items;
        console.log(this.searchList);


      });
    }
  }


  trackKey(dataId: string) {
    if (dataId != null) {
      this.spotifyProvider.getKeyTrack(dataId).then(result => {
        console.log(result);
        this.trackInfo.push(result.key, result.mode);
        this.key = result.key;
        this.mode = result.mode;
        this.id = true;
        this.getKeyFromSpotify(this.trackInfo);
        console.log(this.trackInfo);
      })
    } else {
      this.id = false;
    }
  }

  getKeyFromSpotify(keyMode: any) {
    this.noteProvider.loadNotes().then(result => {
      console.log(result.notes);
      console.log((keyMode[0]));
      result.notes.forEach(element => {
        console.log(element);

        if (element.includes(keyMode[0])) {
          console.log(element);

        }

      });

      switch (keyMode[0]) {
        case 1:
          return 'DO';
        case 2:
          return 'DO#'
        case 3:
          return 'RE';
        case 4:
          return 'RE#';
        case 5:
          return 'MI';
        case 6:
          return 'MI#'
        default:
          break;
      }
      /* for (let index = 0; index < result.length; index++) {
        console.log(result[index]);
        console.log(index);
        

        if (index.toLocaleString(keyMode[0])) {
          console.log((keyMode[0]));

          this.keySearch.push(index);
          console.log(this.keySearch);

        }
      } */
    })
  }
}
