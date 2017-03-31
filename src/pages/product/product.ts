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
  selectedItemID: any;
  public title: string;
  public backdrop_path: string;
  public vote_average: string;
  public overview: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.selectedItemID = navParams.get('item').id;

    this.http.get('https://api.themoviedb.org/3/movie/' + this.selectedItemID + '?sort_by=popularity.desc&api_key=c844d70a09646a2f2adc5a97b30727a5').map(res => res.json()).subscribe(
      data => {
        console.log("Query by ID: " + this.selectedItemID);
        console.log((data));//JSON.stringify
        this.title = data.title;
        this.backdrop_path = data.backdrop_path;
        this.vote_average = data.vote_average;
        this.overview = data.overview;
      },
      err => {
        console.log("Oops!");
      }
    );


  }

}
