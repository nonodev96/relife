import { Component } from "@angular/core";
import { NavController, ModalController } from "ionic-angular";
import { Product, ProductsService } from "../../providers/products-service";
import { SearchFiltersModal } from "../search-filters-modal/search-filters-modal";
import { ProductSearch } from "../../providers/products-service";
import { ProductPage } from "../product/product";


@Component({
  selector: "page-search",
  templateUrl: "search.html"
})
export class SearchPage {

  //region ATRIBUTTES
  public productList: Product[];
  public productSearch: ProductSearch;
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public navCtrl: NavController,
              public modalCtrl: ModalController) {
    this.productSearch = new ProductSearch();
    this.productList = [];
    this.getAllProducts();
  }

  //endregion

  //region CONTROLLERS
  onInput(ev: any) {
    let val = ev.target.value;
    if (val) {
      if (val.length >= 3 || val.length == 0) {
        this.productSearch.title = val;
        this.productSearch.description = val;
        console.log(this.productSearch);
        this.productService.getProductsSearch(this.productSearch).subscribe(
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

  openSearchFiltersModal() {
    let defaultsParamsProductSearch = this.defaultsParametersProductSearch(this.productSearch);

    let profileModal = this.modalCtrl.create(
      SearchFiltersModal,
      { "searchParams": defaultsParamsProductSearch }
    );
    profileModal.onDidDismiss(
      data => {
        let tmpProductSearch = new ProductSearch(data);
        this.productSearch = tmpProductSearch;
        console.log(tmpProductSearch);
      }
    );
    profileModal.present();
  }

  defaultsParametersProductSearch(productSearch) {
    let defaultsProductSearch = productSearch;
    if (defaultsProductSearch.datetime_product != "") {
      defaultsProductSearch.datetime_product = new Date(defaultsProductSearch.datetime_product).toISOString().slice(0, 10);
    } else if (defaultsProductSearch.datetime_product == "") {
      defaultsProductSearch.datetime_product = new Date().toISOString().slice(0, 10);
    }
    if (defaultsProductSearch.starting_price == "") {
      defaultsProductSearch.starting_price = {
        upper: "100",
        lower: "0"
      };
    }
    if (defaultsProductSearch.location == "") {
      defaultsProductSearch.location = "Granada";
    }
    if (defaultsProductSearch.category == "") {
      defaultsProductSearch.category = "0";
    }
    return defaultsProductSearch;
  }

  public openProductPage(product){
    this.navCtrl.push(ProductPage, { product: product });
  }

  //endregion
}
