import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { Product, ProductsService } from "../../providers/products-service";

@Component({
  selector: "page-product",
  templateUrl: "product.html"
})
export class ProductPage {

  //region ATTRIBUTTES
  public productParams: Product;
  public product: Product;
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http) {
    this.productParams = navParams.get("product");
    this.product = this.productParams;
    console.log(this.productParams);
    this.getProduct(this.productParams.id);
  }

  //endregion

  //region CONTROLLERS
  private getProduct(id) {
    this.productService.getProduct(id).subscribe(
      allowed => {
        console.log(JSON.parse(allowed.text()).data);
        this.product = JSON.parse(allowed.text()).data;
      }
    );
  }

  public pujar() {

  }

  //endregion
}
