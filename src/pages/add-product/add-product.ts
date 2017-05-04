import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {InsertProduct, ProductsService} from '../../providers/products-service';
/*
 Generated class for the AddProduct page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {

  //region ATTRIBUTES
  private _productObject: InsertProduct;
  private _image;
  //endregion

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productsService: ProductsService) {
    this._image = "";
  }

  //endregion

  //region GETTER AND SETTER

  get productObject(): InsertProduct {
    return this._productObject;
  }

  set productObject(value: InsertProduct) {
    this._productObject = value;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

//endregion

  //region CONTROLLER
  public addProduct() {
    this.productsService.addProduct(this._productObject).subscribe(
      allowed => {

      },
      error => {

      }
    );
  }

  //endregion

  //region DEBUG
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

//endregion
}
