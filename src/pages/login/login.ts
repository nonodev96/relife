import {Component} from '@angular/core';
import {MenuController, NavController, AlertController, LoadingController, Loading, Platform} from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import {Storage} from '@ionic/storage';

import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';
import {SlidesToolTipsPage} from '../slides-tool-tips/slides-tool-tips';

import {AuthService} from '../../providers/auth-service';


/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;
  public loging: string = "FALSE";
  public registerCredentials = {
    email: '',
    password: ''
  };

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
        this.registerCredentials.email = data;
      });
      this.storage.get("password").then(data => {
        this.registerCredentials.password = data;
      });
      this.storage.get("loging").then(data => {
        this.loging = data;
        if (data == "TRUE") {
          this.login(true);
        }
      });
    });

  }

  public login(changeNavController: boolean) {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.storage.ready().then(() => {
              this.storage.set("email", this.registerCredentials.email);
              this.storage.set("password", this.registerCredentials.password);
              this.storage.set("loging", "TRUE");
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
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  rememberMe() {
    this.nativeStorage.getItem('registerCredentials').then(data => {
      console.log(data);
    });
  }

  private showSlideWelcome() {
    this.navController.push(SlidesToolTipsPage);
  }

  ionViewDidLoad() {

  }

}
