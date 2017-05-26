import { Component } from "@angular/core";
import { IonicPage, NavController, ViewController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-search-filters-modal",
  templateUrl: "search-filters-modal.html"
})
export class SearchFiltersModal {

  public filtersData = {
    starting_price: { lower: 0, upper: 100 },
    datetime_product: ""
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.filtersData.datetime_product = new Date().toISOString().substring(0, 19).replace("T", " ");
  }

  dismiss() {
    this.filtersData.datetime_product = (new Date(this.filtersData.datetime_product)).toISOString()
      .substring(0, 19)
      .replace("T", " ");
    this.viewCtrl.dismiss(this.filtersData);
  }
}
