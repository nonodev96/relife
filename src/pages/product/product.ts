import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";

/*
 Generated class for the Product page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  public product: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http) {
    this.product = navParams.get('product');
    console.log("Product page");
    console.log(this.product);
  }

}
