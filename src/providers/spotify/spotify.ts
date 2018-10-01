import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';




import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the SpotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var app: any;
@Injectable()
export class SpotifyProvider {
  private result: any;


  private apiUrl = 'https://accounts.spotify.com/authorize/?'// requests authorization
  private apiToken = 'https://accounts.spotify.com/api/token'//requests refresh and access tokens
  //private apiToken = 'api/token'//requests refresh and access tokens
  private client_id = ''; // Your client id
  private client_secret = ''; // Your secret
  private redirect_uri = 'http://localhost:8888/callback/'; // Your redirect uri
  private code = 'code';

  private scope = 'user-read-private user-read-email';

  public token: any;

  /*  private httpOptions = {
     headers: new HttpHeaders({
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
       'Access-Control-Allow-Headers': 'Origin, Content-type, X-Auth-Token, Authorization, application/x-www-form-urlencoded',
       'Access-Control-Allow-Credentials': 'true',
       'Content-Type': 'application/json'
     })
   }; */

  private apiUrlSearch = "https://api.spotify.com/v1/search?q="
  private apiUrlIdKey = "	https://api.spotify.com/v1/audio-features/"


  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Basic ' + btoa(this.client_id + ':' + this.client_secret),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }
  private httpOptions: any;

  public searchResults: any;
  // public searchResults =  new Array();
  public searchList: any;

  constructor(public http: HttpClient) {


    // this.getAuth();
    //console.log(btoa(this.client_id + ':' + this.client_secret));
    // if(this.token == null){
    // }
    console.log('Hello SpotifyProvider Provider');
  }


  getToken() {
    return this.http.post(this.apiToken, 'grant_type=client_credentials', this.httpHeaders).subscribe(
      data => {
        console.log(data);
        console.log(data["access_token"]);
        this.token = data["access_token"];
      }, error => {
        console.log('error : ', JSON.stringify(error));
        //recherche du token refresh 

      }, () => {
        console.log('completed');

      })

  }
  /* getToken(): Promise<any> {
     return new Promise(resolve => {
       this.http.post(this.apiToken, 'grant_type=client_credentials', this.httpHeaders).subscribe(data => {
         this.token = data['access_token'];
         console.log(this.token);
 
         resolve(this.token)
       })
     })
 
   }*/


  public getSearch(searchTerm: string): Promise<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return new Promise(resolve => {
      this.http.get(this.apiUrlSearch + searchTerm + '&type=track', this.httpOptions)
        .subscribe(
          result => {
            resolve(result)
            console.log(result);

          });
    });
  }

  public getKeyTrack(id: string): Promise<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    return new Promise(resolve => {
      this.http.get(this.apiUrlIdKey + id, this.httpOptions).subscribe(
        data => {
          console.log(data);
          resolve(data)
        }
      )
    })
  }


}
