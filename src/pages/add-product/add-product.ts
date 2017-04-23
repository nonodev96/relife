import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  //endregion

  //region DEBUG
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  //endregion
}
