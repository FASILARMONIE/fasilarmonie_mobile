import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ToolsMusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsMusicProvider {
public accordage: any
public majeure: any;
public mineur: any;
  constructor(public http: HttpClient) {
    console.log('Hello ToolsMusicProvider Provider');
  }



  public arrangement(){
    var index = 9;
    var frequence = 440.0;
    this.accordage = {index, frequence};
    return this.accordage;
  }

public major(){
return  this.majeure = [0,4,7];
}
}
