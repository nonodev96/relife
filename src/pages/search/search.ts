import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { Product, ProductsService } from "../../providers/products-service";
import { SearchFiltersModal } from "../search-filters-modal/search-filters-modal";
import { ProductSearch } from "../../providers/products-service";


@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {

  //region ATRIBUTTES
  public productList: Product[];
  public productsSearch: ProductSearch;
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public navCtrl: NavController,
              public modalCtrl: ModalController) {

    this.productsSearch = new ProductSearch();
    this.productsSearch.datetime_product = new Date().toISOString().substring(0, 19).replace("T", " ");
    this.productList = [];
    this.getAllProducts();
  }

  //endregion

  //region CONTROLLERS
  onInput(ev: any) {
    let val = ev.target.value;
    console.log(val);
    if (val.length >= 3 || val.length == 0) {
      this.productService.getProductsSearch(this.productsSearch).subscribe(
        data => {
          if (data) {
            setTimeout(() => {
              let response = JSON.parse(data.text());
              this.productList = response.data;

              if (val && val.trim() != "") {
                this.productList = this.productList.filter(
                  (product) => {
                    return (product.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
                  }
                );
              }
            });
          }
        }
      );
    }
  }

  onCancel() {

  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      data => {
        if (data) {
          setTimeout(() => {
            let response = JSON.parse(data.text());
            this.productList = response.data;
          });
        }
      }
    );
  }

  openOptions() {
    let profileModal = this.modalCtrl.create(SearchFiltersModal);
    profileModal.onDidDismiss(data => {
      this.productsSearch = data;
    });
    profileModal.present();
  }

  //endregion
}
