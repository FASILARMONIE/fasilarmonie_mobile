import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoteProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NoteProvider Provider');
  }


  loadNotes() {
    this.http.get("assets/data/note.json").subscribe(data => {

    })
  }
}
