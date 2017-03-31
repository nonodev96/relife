import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Http} from '@angular/http';
import {ProductPage} from "../product/product";

/*
 Generated class for the Home page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items_thumbnails;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=c844d70a09646a2f2adc5a97b30727a5').map(res => res.json()).subscribe(
      data => {
        this.items_thumbnails = data.results;
        console.log("Query by discover: ");
        console.log(data);
      },
      err => {
        console.log("Oops!");
      }
    );
  }

  itemSelected(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ProductPage, {
      item: item
    });
  }


}
