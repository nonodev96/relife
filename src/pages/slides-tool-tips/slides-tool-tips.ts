import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";

/*
 Generated class for the SlidesToolTips page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-slides-tool-tips',
  templateUrl: 'slides-tool-tips.html'
})
export class SlidesToolTipsPage {
  //region ATTRIBUTES
  private _slides;
  //endregion

  //region CONSTRUCTOR
  constructor(public navController: NavController) {
    this._slides = [
      {
        title: "Welcome to the Docs!",
        description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
        image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-1.png",
      },
      {
        title: "What is Ionic?",
        description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
        image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-2.png",
      },
      {
        title: "What is Ionic Cloud?",
        description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "https://ionicframework.com/dist/preview-app/www/assets/img/ica-slidebox-img-3.png",
      }
    ];
  }

  //endregion

  //region GETTER AND SETTER
  get slides() {
    return this._slides;
  }

  set slides(value) {
    this._slides = value;
  }

  //endregion

  //region COMPONENTS
  public changeSetRoot() {
    this.navController.setRoot(HomePage);
  }

  //endregion

  //region DEBUG
  static ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesToolTipsPage');
  }

  //endregion
}
