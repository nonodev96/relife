import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { ProductsService } from '../../providers/products-service';
import { ProductPage } from "../product/product";
import { AddProductPage } from "../add-product/add-product";
import { ServerService } from "../../providers/server-service";

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
/*
 Generated class for the Home page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
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
        let json_data = JSON.parse(allowed.text()).data;
        this._listProductsOfToday = [];

        for (let product of json_data) {
          product.time_left = product.datetime_product;
          this.countDown(product);
          setTimeout(() => {
            this._listProductsOfToday.push(product);
          }, 200);
        }
      },
      error => {
        console.log("error");
      }
    );
  }

  public countDown(product) {
    let datetime = product.time_left;
    let object_datetime_deadline = null;
    let datetime_format = null;
    let tmp = new Date(datetime);
    tmp.setDate(new Date(datetime).getDate() + 1);
    object_datetime_deadline = tmp.getTime();
    product.sInterval = setInterval(
      () => {
        let now = new Date().getTime();
        datetime_format = object_datetime_deadline - now;
        datetime_format = new Date(datetime_format);
        datetime_format = datetime_format.toISOString().substr(0, 19).replace("T", " ").toString();
        product.time_left = datetime_format;
        if (now >= object_datetime_deadline) {
          clearInterval(product.sInterval);
          product.time_left = "1970-01-01 00:00:00";
          this.removeProduct(product);
        }
      },
      1000
    );

  }

  public removeProduct(product) {
    let to_remove = this._listProductsOfToday.indexOf(product);
    if (to_remove > -1) {
      console.log("Borrado o eso creo");
      this._listProductsOfToday.splice(to_remove, 1);
    } else {
      console.log("No remove");
    }
  }

  public openAddProduct() {
    this.navCtrl.push(AddProductPage);
  }

  public logout() {
    this.authService.logout().subscribe(
      allowed => {
        this.navCtrl.setRoot(LoginPage)
      }
    );
  }

  //endregion

  //region COMPONENTS
  private presentToast(message, duration = 3000) {
    let toast = this.toastCtrl.create(
      {
        message: message,
        duration: duration,
        position: 'bottom',
        dismissOnPageChange: true,
      }
    );
    toast.present();
  }

  public searchPush() {
    let alert = this.alertCtrl.create({
      title: 'This page not finish',
      subTitle: 'Sorry',
      buttons: [ 'Dismiss' ]
    });
    alert.present();
  }

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
          this.presentToast('El servicio no está disponible');
          refresher.complete();
        }
      }
    );
  }

  public viewProduct(product) {
    this.navCtrl.push(ProductPage, { product: product });
  }

  //endregion

  //region DEBUG
  static ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  //endregion
}
