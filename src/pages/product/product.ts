import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { UsersService, User } from '../../providers/users-service';
import { Product, ProductsService } from "../../providers/products-service";
import * as moment from 'moment';

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const URL_IMG_USERS = SERVER_URL + "assets/images/users/";
const URL_IMG_PRODUCTS = SERVER_URL + "assets/images/products/";
const IMG_USERS_DEFAULT = "default.jpg";
const IMG_PRODUCTS_DEFAULT = "default.png";

@Component({
  selector: "page-product",
  templateUrl: "product.html"
})
export class ProductPage {

  //region ATTRIBUTTES
  public productParams: Product;
  public product: Product;
  public user: User;
  public backgroundRandomUser;

  public SERVER_URL = SERVER_URL;
  public URL_IMG_USERS = URL_IMG_USERS;
  public URL_IMG_PRODUCTS = URL_IMG_PRODUCTS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  public IMG_PRODUCTS_DEFAULT = IMG_PRODUCTS_DEFAULT;
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public usersService: UsersService,
              public navParams: NavParams,
              public http: Http) {
    this.productParams = navParams.get("product");
    this.product = new Product(this.productParams);
    this.user = new User();
    this.getProduct(this.productParams.id);
    this.getUser(this.productParams.id_user);
    let listBackground = [
      { backgroundUrl: 'assets/imgs/card-saopaolo.png' },
      { backgroundUrl: 'assets/imgs/card-madison.png' },
      { backgroundUrl: 'assets/imgs/card-sf.png' },
      { backgroundUrl: 'assets/imgs/card-amsterdam.png' }
    ];
    let random = this.randomInt(0, listBackground.length - 1);
    this.backgroundRandomUser = listBackground[ random ].backgroundUrl;
  }

  //endregion

  //region CONTROLLERS
  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private getProduct(id) {
    this.productService.getProductById(id).subscribe(
      allowed => {
        this.product = JSON.parse(allowed.text()).data;
        let datetime_product_moment = moment(this.product.datetime_product);
        this.product.datetime_product = datetime_product_moment.locale("es").format("D [de] MMMM [del] YYYY");
        console.log(this.product);
      }
    );
  }

  private getUser(id) {
    this.usersService.getUserById(id).subscribe(
      allowed => {
        console.log(allowed.text());
        let json_response = JSON.parse(allowed.text());
        let user_data = json_response.data;
        this.user = new User(user_data);
        
        console.log(this.user);
      }
    );
  }

  public pujar() {

  }

  //endregion
}
