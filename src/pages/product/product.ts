import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { Product, ProductsService } from "../../providers/products-service";

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const ASSETS_IMG_USERS = "assets/images/users/";
const ASSETS_IMG_PRODUCTS = "assets/images/products/";
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
  public SERVER_URL = SERVER_URL;
  public ASSETS_IMG_USERS = ASSETS_IMG_USERS;
  public ASSETS_IMG_PRODUCTS = ASSETS_IMG_PRODUCTS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  public IMG_PRODUCTS_DEFAULT = IMG_PRODUCTS_DEFAULT;
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public navParams: NavParams,
              public http: Http) {
    this.productParams = navParams.get("product");
    this.product = new Product(this.productParams);
    this.getProduct(this.productParams.id);
  }

  //endregion

  //region CONTROLLERS
  private getProduct(id) {
    this.productService.getProductById(id).subscribe(
      allowed => {
        this.product = JSON.parse(allowed.text()).data;
        console.log(this.product);
      }
    );
  }

  public pujar() {

  }

  //endregion
}
