import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoteProvider {
  public notes: any;
  constructor(public http: HttpClient) {
    console.log('Hello NoteProvider Provider');
  }


  loadNotes(): Promise<any> {
    return new Promise(resolve =>{
      this.http.get("assets/data/notes.json").subscribe(data => {
        console.log(data);
        resolve(data)
      })
    })
    
  }

}
