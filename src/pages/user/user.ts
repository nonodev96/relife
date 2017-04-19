import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {EditUserPage} from "../edit-user/edit-user";

/*
 Generated class for the User page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  //region ATTRIBUTES
  private _user;
  private _listBackground;
  private _backgroundRandom;
  //endregion

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService) {
    this._listBackground = [
      {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-saopaolo.png'},
      {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-madison.png'},
      {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-sf.png'},
      {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-amsterdam.png'}
    ];
    let random = this.randomInt(0, this._listBackground.length - 1);
    this._backgroundRandom = this._listBackground[random].backgroundUrl;
    this._user = JSON.parse(this.authService.getStringDataUser()).data;

    // this.navCtrl.setRoot(HomePage);
    // this.navCtrl.popToRoot();
  }

  //endregion

  //region GETTER AND SETTER
  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get listBackground() {
    return this._listBackground;
  }

  set listBackground(value) {
    this._listBackground = value;
  }

  get backgroundRandom() {
    return this._backgroundRandom;
  }

  set backgroundRandom(value) {
    this._backgroundRandom = value;
  }

  //endregion

  //region CONTROLLER
  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public openEditUser() {
    this.navCtrl.push(EditUserPage);
  }

  //endregion

  //region DEBUG
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  //endregion
}
