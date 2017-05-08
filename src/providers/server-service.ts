import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";


const SERVER_URL = 'https://relifecloud-nonodev96.c9users.io/';
@Injectable()
export class ServerService {

  constructor(public http: Http) {

  }

  public serviceIsAvailable() {
    return Observable.create(
      observer => {
        let link = SERVER_URL;
        this.http.get(link).subscribe(
          response => {
            if (response.status >= 200 && response.status < 300) {
              observer.next(true);
              observer.complete();
            } else {
              observer.next(false);
              observer.complete();
            }
          },
          error => {
            console.log(error);
            observer.next(false);
            observer.complete();
          }
        );
      }
    );
  }

}
