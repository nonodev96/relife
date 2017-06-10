import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

interface InterfaceInsertBid {
  id_user: string | number;
  id_product: string | number;
  bid: string | number;
}

export class InsertBid implements InterfaceInsertBid {
  id_user: string | number;
  id_product: string | number;
  bid: string | number;

  constructor();
  constructor(insertBid: InterfaceInsertBid);
  constructor(insertBid?: any) {
    this.id_user = insertBid && insertBid.id_user || "";
    this.id_product = insertBid && insertBid.id_product || "";
    this.bid = insertBid && insertBid.bid || "";
  }
}

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const SERVER_URL_API = SERVER_URL + "api/";
const SERVER_URL_SALE = SERVER_URL_API + "sale";

@Injectable()
export class SalesService {

  constructor(public http: Http) {
    console.log("Hello SalesServiceProvider Provider");
  }

  public addBid(insertBid: InsertBid) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    let link = SERVER_URL_SALE;
    let body = JSON.stringify(insertBid);
    return Observable.create(
      observer => {
        this.http.post(link, body, options).subscribe(
          response => {
            observer.next(response);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
      }
    );
  }

}
