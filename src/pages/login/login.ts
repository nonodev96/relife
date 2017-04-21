import { Component } from '@angular/core';
import { MenuController, NavController, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { SlidesToolTipsPage } from '../slides-tool-tips/slides-tool-tips';
import { AuthService } from '../../providers/auth-service';
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
  public loading: Loading;
  private _loging: string = "FALSE";
  private _registerCredentials = {
    email: '',
    password: ''
  };
  //endregion

  //region CONSTRUCTOR
  constructor(private auth: AuthService,
              private navController: NavController,
              private menuController: MenuController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage,
              public platform: Platform,
              public storage: Storage) {
    this.menuController = menuController;
    this.menuController.get().enable(false);
    this.storage.ready().then(() => {
      this.storage.get("email").then(data => {
        this._registerCredentials.email = data;
      });
      this.storage.get("password").then(data => {
        this._registerCredentials.password = data;
      });
      this.storage.get("_loging").then(data => {
        this._loging = data;
        if (data == "TRUE") {
          this.login(true);
        }
      });
    });
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

  //endregion

  //region CONTROLLER
  public login(changeNavController: boolean) {
    this.showLoading();
    this.auth.login(this._registerCredentials).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
            console.log(allowed);
            this.loading.dismiss();
            this.storage.ready().then(() => {
              this.storage.set("_email", this._registerCredentials.email);
              this.storage.set("_password", this._registerCredentials.password);
              this.storage.set("_loging", "TRUE");
            });
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
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    let alert = this.alertCtrl.create({
      title: 'Error', subTitle: text, buttons: [ 'OK' ]
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
