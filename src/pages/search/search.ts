import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Product } from "../../providers/products-service";


@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {

  //region ATRIBUTTES
  public productList: Product[];

  //endregion

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.productList = [];
    this.initializeProducts();
  }

  //endregion

  //region CONTROLLERS
  onInput(ev: any) {
    this.initializeProducts();
    let val = ev.target.value;

    if (val && val.trim() != "") {
      this.productList = this.productList.filter(
        (product) => {
          return (product.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      );
    }
  }

  onCancel() {

  }

  initializeProducts() {
    this.productList = [];
    let product = new Product();
    for (let i = 0; i < 10; i++) {
      let pro: Product = {
        id: i,
        id_user: i,
        title: "Product " + i,
        description: "Lorem ipsum",
        starting_price: "",
        image: "",
        datetime_product: "",
        location: ""
      };
      product = new Product(pro);
      console.log(product);
      this.productList.push(product);
    }
  }

  //endregion

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
  }
}
