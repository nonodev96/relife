import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Product } from "../../providers/products-service";
import { ProductPage } from "../product/product";

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const URL_IMG_USERS = SERVER_URL + "assets/images/users/";
const URL_IMG_PRODUCTS = SERVER_URL + "assets/images/products/";
const IMG_USERS_DEFAULT = "default.jpg";
const IMG_PRODUCTS_DEFAULT = "default.png";

@Component({
  selector: "page-favorites",
  templateUrl: "favorites.html"
})
export class FavoritesPage {
  public list_products_favorites;

  public URL_IMG_USERS = URL_IMG_USERS;
  public URL_IMG_PRODUCTS = URL_IMG_PRODUCTS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  public IMG_PRODUCTS_DEFAULT = IMG_PRODUCTS_DEFAULT;

  //Pendiente
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.list_products_favorites = [
      new Product({
        id: "32",
        id_user: "29",
        title: "Sofá chaselongue intercambiables",
        description: "sofas nuevos con garantía asientos deslizantes mide 250/170 puff Mobile o fijo telas amtimanchas varios colores posibilidad transporte y montaje Tel o wapsap 651580104\n",
        starting_price: "555",
        image: "products_32.jpg",
        datetime_product: "",
        location: ""
      }),
      new Product({
        id: "1",
        id_user: "32",
        title: "Pc de 3 años, 8GB de ram DDR3, 512GB de memoria y procesador i5 a 2.8GHz",
        description: "2",
        starting_price: "16",
        image: "products_1.jpg",
        datetime_product: "",
        location: ""
      })
    ];
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FavoritesPage");
  }

  public openProductPage(product) {
    this.navCtrl.push(ProductPage, { product: product });
  }
}
