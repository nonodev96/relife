import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

interface sale {
  id: string;
  id_user: string;
  bid: string;
  datatime_sale: string;
}

interface InterfaceProduct {
  id: string;
  id_user: string;
  title: string;
  description: string;
  starting_price: string;
  image: string;
  datetime_product: string;
  location: string;
  max: sale;
  min: sale;
  sale: Array<sale>;
}
export class Product implements InterfaceProduct {
  id: string;
  id_user: string;
  title: string;
  description: string;
  starting_price: string;
  image: string;
  datetime_product: string;
  location: string;
  max: sale;
  min: sale;
  sale: Array<sale>;

  constructor();
  constructor(product: InterfaceProduct);
  constructor(product?: any) {
    this.id = product && product.id || "";
    this.id_user = product && product.id_user || "";
    this.title = product && product.title || "";
    this.description = product && product.description || "";
    this.starting_price = product && product.starting_price || "";
    this.image = product && product.image || "";
    this.datetime_product = product && product.datetime_product || "";
    this.location = product && product.location || "";
    this.max = product && product.max || "";
    this.min = product && product.min || "";
    this.sale = product && product.sale || "";
  }
}

interface InterfaceProductOfToday {
  id: string;
  id_user: string;
  title: string;
  description: string;
  starting_price: string;
  image: string;
  datetime_product: string;
  location: string;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_avatar: string;
  max: sale;
  min: sale;
  sales: Array<sale>;
}
export class ProductOfToday implements InterfaceProductOfToday {
  id: string;
  id_user: string;
  title: string;
  description: string;
  starting_price: string;
  image: string;
  datetime_product: string;
  location: string;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_avatar: string;
  max: sale;
  min: sale;
  sales: Array<sale>;

  constructor();
  constructor(productOfToday: InterfaceProductOfToday);
  constructor(productOfToday?: any) {
    this.id = productOfToday && productOfToday.id || "";
    this.id_user = productOfToday && productOfToday.id_user || "";
    this.title = productOfToday && productOfToday.title || "";
    this.description = productOfToday && productOfToday.description || "";
    this.starting_price = productOfToday && productOfToday.starting_price || "";
    this.image = productOfToday && productOfToday.image || "";
    this.datetime_product = productOfToday && productOfToday.datetime_product || "";
    this.location = productOfToday && productOfToday.location || "";
    this.nickname = productOfToday && productOfToday.nickname || "";
    this.first_name = productOfToday && productOfToday.first_name || "";
    this.last_name = productOfToday && productOfToday.last_name || "";
    this.email = productOfToday && productOfToday.email || "";
    this.profile_avatar = productOfToday && productOfToday.profile_avatar || "";
    this.max = productOfToday && productOfToday.max || "";
    this.min = productOfToday && productOfToday.min || "";
    this.sales = productOfToday && productOfToday.sales || "";
  }
}

interface InterfaceInsertProduct {
  id_user: string | number;
  title: string;
  description: string;
  starting_price: string | number;
  image: string;
  location: string;
  category: number | string;
}
export class InsertProduct implements InterfaceInsertProduct {
  id_user: string | number;
  title: string;
  description: string;
  starting_price: string | number;
  image: string;
  location: string;
  category: number | string;

  constructor();
  constructor(insertProduct: InterfaceInsertProduct);
  constructor(insertProduct?: any) {
    this.id_user = insertProduct && insertProduct.id_user || "";
    this.title = insertProduct && insertProduct.title || "";
    this.description = insertProduct && insertProduct.description || "";
    this.starting_price = insertProduct && insertProduct.starting_price || "";
    this.image = insertProduct && insertProduct.image || "";
    this.location = insertProduct && insertProduct.location || "";
    this.category = insertProduct && insertProduct.category || "";
  }
}

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const SERVER_URL_API = SERVER_URL + "api/";
@Injectable()
export class ProductsService {

  //region ATTRIBUTES
  private _listProductsOfToday: Array<ProductOfToday>;

  //endregion

  //region CONSTRUCTOR
  constructor(public http: Http) {
    this._listProductsOfToday = [];
  }

  //endregion

  //region GETTER AND SETTER
  get listProductsOfToday(): Array<ProductOfToday> {
    return this._listProductsOfToday;
  }

  set listProductsOfToday(value: Array<ProductOfToday>) {
    this._listProductsOfToday = value;
  }

  //endregion

  //region CONTROLLER
  public getProductsOfToday() {
    return Observable.create(
      observer => {
        let link = SERVER_URL_API + "product/getProductsOfToday";
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

  public getProduct(id = 0) {
    return Observable.create(
      observer => {
        let link = SERVER_URL_API + "product/" + id;
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

  public addProduct(productObject: InsertProduct) {
    return Observable.create(
      observer => {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let link = SERVER_URL_API + "product";
        let body = JSON.stringify(productObject);

        this.http.post(link, body, options).subscribe(
          response => {
            console.log(response);
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

  public deleteProduct(productObject: InsertProduct) {
    return Observable.create(
      observer => {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let link = SERVER_URL_API + "product";
        let body = JSON.stringify(productObject);

        this.http.post(link, body, options).subscribe(
          response => {
            console.log("HTTP PUT");
            console.log(response);
            observer.next(response);
            observer.complete();
          },
          error => {
            console.log("Error observer");
            observer.next(error);
            observer.complete();
          }
        );
      }
    );
  }

  //endregion
}
