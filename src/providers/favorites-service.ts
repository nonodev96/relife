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
    this.id_product = insertFavorite && insertFavorite.id_user_to || "";
  }
}

interface InterfaceDeleteFavoriteByIdUserAndProduct {
  id_user: string | number;
  id_product: string | number;
}

export class DeleteFavoriteByIdUserAndProduct implements InterfaceDeleteFavoriteByIdUserAndProduct {
  id_user: string | number;
  id_product: string | number;

  constructor();
  constructor(deleteFavoriteByIdUserAndProduct: InterfaceDeleteFavoriteByIdUserAndProduct);
  constructor(deleteFavoriteByIdUserAndProduct?: any) {
    this.id_user = deleteFavoriteByIdUserAndProduct && deleteFavoriteByIdUserAndProduct.id_user || "";
    this.id_product = deleteFavoriteByIdUserAndProduct && deleteFavoriteByIdUserAndProduct.id_product || "";
  }
}

interface InterfaceDeleteFavorite {
  id: string | number;
}

export class DeleteFavorite implements InterfaceDeleteFavorite {
  id: string | number;

  constructor();
  constructor(deleteFavorite: InterfaceDeleteFavorite);
  constructor(deleteFavorite?: any) {
    this.id = deleteFavorite && deleteFavorite.id || "";
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

  public addFavorite(insertFavorite: InsertFavorite) {
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    let url = SERVER_URL_FAVORITES;
    let body = JSON.stringify(insertFavorite);
    return Observable.create(
      observer => {
        this.http.post(url, body, options).subscribe(
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

  public deleteFavorite(deleteFavorite: DeleteFavorite) {
    let link = SERVER_URL_FAVORITES + "/" + deleteFavorite.id;
    return Observable.create(
      observer => {
        this.http.delete(link).subscribe(
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

  public deleteFavoriteByIdUserAndProduct(deleteFavoriteByIdUserAndProduct: DeleteFavoriteByIdUserAndProduct) {
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(deleteFavoriteByIdUserAndProduct);
    let url = SERVER_URL_FAVORITES + "/delete";
    return Observable.create(
      observer => {
        this.http.post(url, body, options).subscribe(
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
