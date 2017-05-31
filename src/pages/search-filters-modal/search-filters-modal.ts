import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { ProductSearch } from "../../providers/products-service";
import { FormBuilder, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-search-filters-modal",
  templateUrl: "search-filters-modal.html"
})
export class SearchFiltersModal {
  public productSearch: ProductSearch;
  private productSearchFormGroup: FormGroup;
  selectOptions;

  constructor(private formBuilder: FormBuilder,
              public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    let searchParams = this.navParams.get("searchParams");
    console.log(searchParams);
    this.productSearch = new ProductSearch(searchParams);
    this.productSearch.datetime_product = new Date(this.productSearch.datetime_product).toISOString().slice(0, 10);

    console.log(this.productSearch);
    this.productSearchFormGroup = this.formBuilder.group(
      {
        title: [ this.productSearch.title ],
        description: [ this.productSearch.description ],
        starting_price: [ this.productSearch.starting_price ],
        datetime_product: [ this.productSearch.datetime_product ],
        location: [ this.productSearch.location ],
        category: [ this.productSearch.category ]
      }
    )
    ;
    this.selectOptions = {
      title: "Categorías",
      subTitle: "Selecciona una categoría"
    };
  }


  dismiss() {
    let datetime_product = new Date(this.productSearchFormGroup.value.datetime_product);
    this.productSearchFormGroup.value.datetime_product = datetime_product.toISOString().slice(0, 10);
    this.viewCtrl.dismiss(this.productSearchFormGroup.value);
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
    let categoriesReturn = [
      {
        value: 0,
        name: "Otras Categorías"
      }
    ];
    for (let key in categories) {
      let value = parseInt(key) + 1;
      let name = categories[ key ];
      categoriesReturn.push({
        value: value,
        name: name
      });
    }
    return categoriesReturn;
  }
}
