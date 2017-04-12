import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { ProductsService } from '../../providers/products-service';

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
  public userInfo;
  public name: string;
  public listProductsOfToday: Array<ProductOfToday>;

  constructor(private authService: AuthService,
              private prodService: ProductsService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public nativeStorage: NativeStorage,
              public alertCtrl: AlertController,
              public storage: Storage) {

    this.userInfo = this.authService.getUserInfo();
    this.listProductsOfToday = [];
    this.updateHome();
  }

  public updateHome() {
    this.prodService.getProductsOfToday().subscribe(
      allowed => {
        let json_data = JSON.parse(allowed.text()).data;
        for (let product of json_data) {
          product.time_left = product.datetime_product;
          this.listProductsOfToday.push(
            product
          );
          // console.log("product.datetime_product " + product.datetime_product);
          // console.log("time_left " + product.time_left);
          this.countDown(product);
        }
      },
      error => {
        console.log("error");
      }
    );
  }

  public countDown(product) {
    // let setinterval = null;
    // clearInterval(setinterval);
    let datetime = product.time_left;
    // console.log(product);
    let object_datetime_deadline = null;
    let datetime_format = null;
    let tmp = new Date(datetime);
    tmp.setDate(new Date(datetime).getDate() + 1);
    object_datetime_deadline = tmp.getTime();
    setInterval(
      ()=> {
        let now = new Date().getTime();
        datetime_format = object_datetime_deadline - now;
        datetime_format = new Date(datetime_format);
        datetime_format = datetime_format.toISOString().substr(0, 19).replace("T", " ").toString();
        product.time_left = datetime_format;
        if (now > object_datetime_deadline) {
          console.log("borrar");
        }
      },
      1000
    );

  }

  public searchPush() {
    let alert = this.alertCtrl.create({
      title: 'This page not finish',
      subTitle: 'Sorry',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  public clickStorage() {
    // set a key/value
    this.storage.set('name', 'Max');

    // Or to get a key/value pair
    this.storage.get('name').then((data)=> {
      this.name = data;
    });

    let alert = this.alertCtrl.create({
      title: 'The name is ' + this.name,
      subTitle: 'The ionic database is working',
      buttons: ['ok']
    });
    alert.present();
  }

  public presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username',
          type: 'email'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            if (data.username != "") {
              // logged in!
              console.log("handler->login true");
            } else {
              // invalid login
              console.log("handler->login false");
            }
          }
        }
      ]
    });
    alert.present();
  }

  public logout() {
    this.authService.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

  doRefresh(refresher) {
    this.prodService.getProductsOfToday().subscribe(
      allowed => {
        let json_data = JSON.parse(allowed.text()).data;
        this.listProductsOfToday = [];
        for (let product of json_data) {
          this.listProductsOfToday.push(
            product
          );
        }
        refresher.complete();
        console.log(this.listProductsOfToday);
      },
      error => {
        console.log("GetProductsOfToday error");
        refresher.cancel();
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
