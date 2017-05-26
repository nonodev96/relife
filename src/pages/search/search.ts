import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { Product, ProductsService } from "../../providers/products-service";
import { SearchFiltersModal } from "../search-filters-modal/search-filters-modal";


@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {

  //region ATRIBUTTES
  public productList: Product[];
  public filtersData = {
    starting_price: { lower: 0, upper: 1000 },
    datetime_product: new Date().toISOString().substring(0, 19).replace("T", " ")
  };
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public navCtrl: NavController,
              public modalCtrl: ModalController) {
    this.productList = [];
    this.getAllProducts();
  }

  //endregion

  //region CONTROLLERS
  onInput(ev: any) {
    let val = ev.target.value;
    console.log(val);
    if (val.length >= 3 || val.length == 0) {
      console.log(this.filtersData);
      this.productService.getProductsSearch(this.filtersData).subscribe(
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
      this.filtersData = data;
    });
    profileModal.present();
  }

  //endregion
}
