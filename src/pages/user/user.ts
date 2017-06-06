import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { User } from '../../providers/users-service';
import { EditUserPage } from "../edit-user/edit-user";
import { SharedService } from "../../providers/shared-service";
import * as moment from 'moment';

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const URL_IMG_USERS = SERVER_URL + "assets/images/users/";
const IMG_USERS_DEFAULT = "default.jpg";
//const URL_IMG_PRODUCTS = SERVER_URL + "assets/images/products/";
//const IMG_PRODUCTS_DEFAULT = "default.png";
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage implements OnInit {

  //region IMPLEMENTS
  ngOnInit(): void {
    this.sharedService.getEmittedUser().subscribe(
      item => {
        this._user = item;
        let birth_date_moment = moment(this._user.birth_date);
        this._birth_date = birth_date_moment.locale("es").format("D [de] MMMM [del] YYYY");
        let join_date_moment = moment(this._user.join_date);
        this._join_date = join_date_moment.locale("es").format("D [de] MMMM [del] YYYY");
      }
    );
  }

  //endregion

  //region ATTRIBUTES
  private _user: User;
  private _listBackground;
  private _backgroundRandom;
  private _birth_date;
  private _join_date;

  public SERVER_URL = SERVER_URL;
  public URL_IMG_USERS = URL_IMG_USERS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  //endregion

  //region CONSTRUCTOR
  constructor(private authService: AuthService,
              private sharedService: SharedService,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this._user = this.authService.getUser();
    console.log(this._user);
    let birth_date_moment = moment(this._user.birth_date);
    this._birth_date = birth_date_moment.locale("es").format("D [de] MMMM [del] YYYY");
    let join_date_moment = moment(this._user.join_date);
    this._join_date = join_date_moment.locale("es").format("D [de] MMMM [del] YYYY");
    this._listBackground = [
      { backgroundUrl: 'assets/imgs/card-saopaolo.png' },
      { backgroundUrl: 'assets/imgs/card-madison.png' },
      { backgroundUrl: 'assets/imgs/card-sf.png' },
      { backgroundUrl: 'assets/imgs/card-amsterdam.png' }
    ];
    let random = this.randomInt(0, this._listBackground.length - 1);
    this._backgroundRandom = this._listBackground[ random ].backgroundUrl;
  }

  //endregion

  //region GETTER AND SETTER
  get user(): User {
    return this._user;
  }

  set user(value: User) {
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

  get birth_date() {
    return this._birth_date;
  }

  set birth_date(value) {
    this._birth_date = value;
  }

  get join_date() {
    return this._join_date;
  }

  set join_date(value) {
    this._join_date = value;
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

}
