import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyProvider } from '../spotify/spotify';

/*
  Generated class for the SearchSpotifyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchSpotifyProvider {
  private token: any;

  private apiUrlSearch = "https://api.spotify.com/v1/search?q="

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.spotifyProvider.token
    })
  };


  constructor(public http: HttpClient, private spotifyProvider: SpotifyProvider) {
  }

 /* public getSearch(searchTerm: string) {
   return this.http.get(this.apiUrlSearch + searchTerm, this.httpOptions).map(res=> res.json())
    
  } */
  public getSearch(searchTerm: string) {
    return this.http.get(this.apiUrlSearch + searchTerm, this.httpOptions).subscribe(
      result => {
        console.log(result);

      }, error => {
        console.log(error);

      }
    )
  } 


}
