import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TrackAndKey } from '../../models/trackAndKey'


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { HTTP } from '@ionic-native/http';


/*
  Generated class for the SpotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var app: any;
@Injectable()
export class SpotifyProvider {
  public token: any;

  private idString: any;
  private idTracks: Array<any> = new Array<any>();
  private idTrackString: any;
  private results: any
  private tracksAndKey: Array<TrackAndKey>;
  private idresults: any;
  private infosTrack: any;


  // private apiToken = 'https://accounts.spotify.com/api/token'//requests refresh and access tokens
   private apiToken = '/api/token'//requests refresh and access tokens
  private client_id = ''; // Your client id
  private client_secret = ''; // Your secret

  private apiUrlSearch = "https://api.spotify.com/v1/search?q="
  private apiUrlIdKey = "	https://api.spotify.com/v1/audio-features/?ids="


  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
  private httpOptions: any;

  public searchResults: any;
  public searchList: any;

  constructor(public http: HttpClient, private httpCors: HTTP) {
    console.log('Hello SpotifyProvider Provider');
  }


  getToken() {
    return this.http.post(this.apiToken, 'grant_type=client_credentials', this.httpHeaders).subscribe(
      data => {
        console.log(data);
        //console.log(data["access_token"]);
        this.token = data["access_token"];
      }, error => {
        console.log('error : ', JSON.stringify(error));
        //recherche du token refresh 
      }, () => {
        console.log('completed');

      })
  }

  public getSearch(searchTerm: string): Promise<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return new Promise(resolve => {
      this.http.get(this.apiUrlSearch + searchTerm + '&type=track&limit=5', this.httpOptions)
        .subscribe(
          result => {
            if(this.results != null){
              this.results = null
            }
            this.results = result["tracks"].items;
            this.tracksAndKey = new Array<TrackAndKey>();
            this.idTracks = new Array<any>();
            this.infosTrack = new Array<any>();
            this.idresults = null;
            //console.log(this.results);
            this.results.forEach(element => {
              if (this.tracksAndKey == null) {
                this.tracksAndKey = new Array<TrackAndKey>();

              }
              this.infosTrack = new TrackAndKey();
              this.infosTrack.id = element.id;
              this.infosTrack.album = element.album.name;
              this.infosTrack.artist = element.artists[0].name;
              this.infosTrack.name = element.name;
              this.infosTrack.picture = element.album.images[0];
              this.tracksAndKey.push(this.infosTrack);
              // console.log(this.tracksAndKey);

              this.idTracks.push(element.id)
              // console.log(this.idTracks);

            });
            this.idString = '';
            for (let i = 0; i < this.idTracks.length; i++) {
              this.idString += this.idTracks[i] + ",";
              // console.log(this.idString);
            }

            this.http.get(this.apiUrlIdKey + this.idString, this.httpOptions).subscribe(
              data => {
                // console.log(data["audio_features"]);
                this.idresults = data["audio_features"];
                const array3 = []
                for (let x of this.tracksAndKey) {
                  const found = this.idresults.filter(y => y.id === x.id).shift();
                  if (found) {
                    array3.push({ ...x, ...found });
                  }
                  array3.push(...this.idresults.filter(z => this.tracksAndKey.map(x => x.id).indexOf(z.id) === -1))
                }
                console.log(array3);
                resolve(array3)
              }
            )
          });
    });
  }

}
