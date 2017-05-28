import { Component } from "@angular/core";
import { IonicPage, NavController, ViewController } from "ionic-angular";
import { ProductSearch } from "../../providers/products-service";

@IonicPage()
@Component({
  selector: "page-search-filters-modal",
  templateUrl: "search-filters-modal.html"
})
export class SearchFiltersModal {
  public productSearch: ProductSearch;
  selectOptions;
  select;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {
    this.productSearch = new ProductSearch();
    this.productSearch.datetime_product = new Date().toISOString().substring(0, 19).replace("T", " ");

    this.selectOptions = {
      title: 'Categorías',
      subTitle: 'Selecciona una categoría'
    };
    this.select = "0";
  }

  dismiss() {
    this.productSearch.datetime_product = (new Date(this.productSearch.datetime_product)).toISOString()
      .substring(0, 19)
      .replace("T", " ");
    this.viewCtrl.dismiss(this.productSearch);
  }

  public categories() {
    let categories = [
      "Coches",
      "Motor y Accesorios",
      "Electrónica",
      "Deporte y Ocio",
      "Muebles, Deco y Jardín",
      "Consolas y Videojuegos",
      "Libros, Películas y Música",
      "Moda y Accesorios",
      "Niños y Bebés",
      "Inmobiliaria",
      "Electrodomésticos",
      "Servicios",
      "Otros"
    ];
    let categoriesReturn = [{
      value: 0,
      name: "Otras Categorías",
    }];
    for (let key in categories) {
      let value = parseInt(key) + 1;
      let name = categories[key];
      categoriesReturn.push({
        value: value,
        name: name
      });
    }
    return categoriesReturn;
  }
}
