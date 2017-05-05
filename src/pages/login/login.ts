import {Component} from '@angular/core';
import {MenuController, NavController, AlertController, LoadingController, Loading, Platform} from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import {Storage} from '@ionic/storage';
import {HomePage} from '../home/home';
import {SlidesToolTipsPage} from '../slides-tool-tips/slides-tool-tips';
import {AuthService} from '../../providers/auth-service';
import {SharedService} from "../../providers/shared-service";
/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login', templateUrl: 'login.html'
})
export class LoginPage {

  //region ATTRIBUTES
  private _loading: Loading;
  private _loging: string = "FALSE";
  private _registerCredentials = {
    email: '',
    password: ''
  };
  public _user;
  //endregion

  //region CONSTRUCTOR
  constructor(private sharedService: SharedService,
              private auth: AuthService,
              private navController: NavController,
              private menuController: MenuController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage,
              public platform: Platform,
              public storage: Storage) {
    this._user = {};
  }

  //endregion

  //region GETTER AND SETTER
  get registerCredentials(): { email: string; password: string } {
    return this._registerCredentials;
  }

  set registerCredentials(value: { email: string; password: string }) {
    this._registerCredentials = value;
  }

  get loging(): string {
    return this._loging;
  }

  set loging(value: string) {
    this._loging = value;
  }

  get loading(): Loading {
    return this._loading;
  }

  set loading(value: Loading) {
    this._loading = value;
  }

  //endregion

  //region CONTROLLER
  public login(changeNavController: boolean) {
    this.showLoading();
    this.auth.login(this._registerCredentials).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
            console.log("Line 92 de login.ts");
            console.log(allowed);
            console.log("Line 94 de login.ts");
            this._loading.dismiss();

            this.storage.ready().then(() => {
              this.storage.set("_email", this._registerCredentials.email);
              this.storage.set("_password", this._registerCredentials.password);
              this.storage.set("_loging", "TRUE");
            });
            this.sharedService.setEmitterUser(this.auth.getUserInfo());
            this.sharedService.getEmittedUser().subscribe(item => this._user = this.auth.getUserInfo());
            this.menuController.get().enable(true);
            if (changeNavController == true) {
              this.navController.setRoot(HomePage);
            } else {
              this.navController.setRoot(SlidesToolTipsPage);
            }
          });
        } else {
          this.showError("Acceso denegado");
        }
      },
      error => {
        this.showError(error);
      }
    );
  }

  public createAccount() {
    console.log("pendiente createAccount");
  }

  //endregion

  //region COMPONENTS
  showLoading() {
    this._loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this._loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this._loading.dismiss();
    });
    let alert = this.alertCtrl.create({
      title: 'Error', subTitle: text, buttons: ['OK']
    });
    alert.present(prompt);
  }

  rememberMe() {
    this.nativeStorage.getItem('_registerCredentials').then(data => {
      console.log(data);
    });
  }

  //endregion

  //region DEBUG
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //endregion
}
