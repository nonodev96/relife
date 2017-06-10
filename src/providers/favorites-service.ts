import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

interface InterfaceInsertFavorite {
  id_user: string | number;
  id_product: string | number;
}

export class InsertFavorite implements InterfaceInsertFavorite {
  id_user: string | number;
  id_product: string | number;

  constructor();
  constructor(insertFavorite: InterfaceInsertFavorite);
  constructor(insertFavorite?: any) {
    this.id_user = insertFavorite && insertFavorite.id_user || "";
    this.id_product = insertFavorite && insertFavorite.id_product || "";
  }
}

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const SERVER_URL_API = SERVER_URL + "api/";
const SERVER_URL_FAVORITES = SERVER_URL_API + "favorites";

@Injectable()
export class FavoritesService {

  constructor(public http: Http) {

  }

  public getFavoritesByUserId(id: string | number = 0) {
    let link = SERVER_URL_FAVORITES + "/" + id;
    return Observable.create(
      observer => {
        this.http.get(link).subscribe(
          data => {
            observer.next(data);
            observer.complete();
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

  public getProductsFavoritesByUserId(id: string | number = 0) {
    let link = SERVER_URL_FAVORITES + "/" + id + "/products";
    return Observable.create(
      observer => {
        this.http.get(link).subscribe(
          data => {
            observer.next(data);
            observer.complete();
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

  public addFavorite(productObject: InsertFavorite) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });

    let link = SERVER_URL_FAVORITES;
    let body = JSON.stringify(productObject);
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
