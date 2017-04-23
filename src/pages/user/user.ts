import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service';
import { EditUserPage } from "../edit-user/edit-user";
import { SharedService } from "../../providers/shared-service";

/*
 Generated class for the User page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage implements OnInit {

  //region IMPLEMENTS
  ngOnInit(): void {
    this.sharedService.getEmittedUser().subscribe(item => this._user = item);
  }

  //endregion

  //region ATTRIBUTES
  private _user: User;
  private _listBackground;
  private _backgroundRandom;

  //endregion

  //region CONSTRUCTOR
  constructor(private authService: AuthService,
              private sharedService: SharedService,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this._user = this.authService.getUserInfo();
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
