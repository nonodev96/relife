import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export class ProductOfToday {
  public id: string;
  public id_user: string;
  public title: string;
  public description: string;
  public starting_price: string;
  public image: string;
  public datetime_product: string;
  public location: string;
  public nickname: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public profile_avatar: string;

  constructor(id: string,
              id_user: string,
              title: string,
              description: string,
              starting_price: string,
              image: string,
              datetime_product: string,
              location: string,
              nickname: string,
              first_name: string,
              last_name: string,
              email: string,
              profile_avatar: string) {
    this.id = id;
    this.id_user = id_user;
    this.title = title;
    this.description = description;
    this.starting_price = starting_price;
    this.image = image;
    this.datetime_product = datetime_product;
    this.location = location;
    this.nickname = nickname;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.profile_avatar = profile_avatar;

  }
}
/*
 {"meta":[],"data":[
 {"id":"7","id_user":"1","title":"Titulo actualizado","description":"descripci\u00f3n",
 "starting_price":"3.31","image":"product_7.gif","datetime_product":"2017-04-10 18:53:07",
 "location":"Granada","nickname":"nono","first_name":"Antonio","last_name":"Mudarra Machuca",
 "email":"nonodev96@gmail.com","profile_avatar":"user_1.jpg"}
 Generated class for the ProductsService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
const SERVER_URL = 'https://relifecloud-nonodev96.c9users.io/api/';
@Injectable()
export class ProductsService {
  //region ATRIBUTES
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
    return Observable.create(observer => {
      let link = SERVER_URL + 'product/getProductsOfToday';
      this.http.get(link).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        err => {
          console.log(err);
          observer.next(false);
          observer.complete();
        }
        // () => {console.log(this)}
      );
    });
  }

  //endregion
}
