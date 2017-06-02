import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";
import { Storage } from "@ionic/storage";

import { AuthService } from "../../providers/auth-service";
import { ProductsService } from "../../providers/products-service";
import { ProductPage } from "../product/product";
import { AddProductPage } from "../add-product/add-product";
import { ServerService } from "../../providers/server-service";
import { SearchPage } from "../search/search";

//import {AddProductPage} from '../add-product/add-product';
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
  public time_left: string;

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
    this.time_left = datetime_product;
  }
}

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  //region ATTRIBUTES
  private _userInfo;
  private _name: string;
  private _listProductsOfToday: Array<ProductOfToday>;
  //endregion

  //region CONSTRUCTOR
  constructor(private authService: AuthService,
              private serverService: ServerService,
              private prodService: ProductsService,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public storage: Storage) {

    this._userInfo = this.authService.getUser();
    this._listProductsOfToday = [];
    this.updateHome();
  }

  //endregion

  //region GETTER AND SETTER
  get userInfo() {
    return this._userInfo;
  }

  set userInfo(value) {
    this._userInfo = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get listProductsOfToday(): Array<ProductOfToday> {
    return this._listProductsOfToday;
  }

  set listProductsOfToday(value: Array<ProductOfToday>) {
    this._listProductsOfToday = value;
  }

  //endregion

  //region CONTROLLER
  public updateHome() {
    this.prodService.getProductsOfToday().subscribe(
      allowed => {
        let jsonProductsOfToday_data = JSON.parse(allowed.text()).data;
        this._listProductsOfToday = [];
        for (let productOfToday of jsonProductsOfToday_data) {
          productOfToday.time_left = productOfToday.datetime_product;
          this.countDown(productOfToday);
          setTimeout(() => {
            this._listProductsOfToday.push(productOfToday);
          }, 200);
        }
      },
      error => {
        console.log("error");
      }
    );
  }

  public countDown(productOfToday) {
    let datetime = productOfToday.time_left;
    let object_datetime_deadline = null;
    let datetime_format = null;
    let tmp = new Date(datetime);
    tmp.setDate(new Date(datetime).getDate() + 1);
    object_datetime_deadline = tmp.getTime();
    productOfToday.sInterval = setInterval(
      () => {
        let now = new Date().getTime();
        datetime_format = object_datetime_deadline - now;
        datetime_format = new Date(datetime_format);
        datetime_format = datetime_format.toISOString().substr(0, 19).replace("T", " ").toString();
        productOfToday.time_left = datetime_format;
        if (now >= object_datetime_deadline) {
          clearInterval(productOfToday.sInterval);
          productOfToday.time_left = "1970-01-01 00:00:00";
          this.removeProductOfToday(productOfToday);
        }
      },
      1000
    );

  }

  public removeProductOfToday(productOfToday) {
    let to_remove = this._listProductsOfToday.indexOf(productOfToday);
    if (to_remove > -1) {
      console.log("Borrado o eso creo");
      this._listProductsOfToday.splice(to_remove, 1);
    } else {
      console.log("No remove");
    }
  }

  public openAddProductPage() {
    this.navCtrl.push(AddProductPage);
  }

  public openSearchPage() {
    this.navCtrl.push(SearchPage);
  }

  //endregion

  //region COMPONENTS
  public doRefresh(refresher) {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          this.prodService.getProductsOfToday().subscribe(
            allowed => {
              let json_data = JSON.parse(allowed.text()).data;
              this._listProductsOfToday = [];

              for (let product of json_data) {
                product.time_left = product.datetime_product;
                this.countDown(product);
                this._listProductsOfToday.push(product);
              }

              refresher.complete();
            },
            error => {
              console.log("GetProductsOfToday error");
              refresher.cancel();
            }
          );
        } else {
          this.presentToast("El servicio no está disponible");
          refresher.complete();
        }
      }
    );
  }

  public viewProductOfToday(productOfToday) {
    this.navCtrl.push(ProductPage, { product: productOfToday });
  }

  private presentToast(message, duration = 3000) {
    let toast = this.toastCtrl.create(
      {
        message: message,
        duration: duration,
        position: "bottom",
        dismissOnPageChange: true
      }
    );
    toast.present();
  }

  //endregion

}
