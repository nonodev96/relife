import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ProductPage } from "../product/product";
import { User } from "../../providers/users-service";
import { FavoritesService } from "../../providers/favorites-service";
import { AuthService } from "../../providers/auth-service";

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
  private user: User;

  public URL_IMG_USERS = URL_IMG_USERS;
  public URL_IMG_PRODUCTS = URL_IMG_PRODUCTS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  public IMG_PRODUCTS_DEFAULT = IMG_PRODUCTS_DEFAULT;

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              public favoritesService: FavoritesService) {
    this.user = this.authService.getUser();
    this.list_products_favorites = [];
    this.getProductsFavoritesByUserId();
  }

  //endregion

  //region CONTROLLERS
  private getProductsFavoritesByUserId() {
    let id_user = this.user.id;
    this.favoritesService.getProductsFavoritesByUserId(id_user).subscribe(
      data => {
        if (data) {
          setTimeout(() => {
            let response = JSON.parse(data.text());
            this.list_products_favorites = response.data;
          });
        }
      }
    );
  }

  //endregion

  //region COMPONENTS
  public openProductPage(product) {
    this.navCtrl.push(ProductPage, { product: product });
  }

  //endregion
}
