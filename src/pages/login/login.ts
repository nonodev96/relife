import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, Platform} from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home';

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
  registerCredentials = {email: '', password: ''};

  constructor(private nav: NavController,
              private auth: AuthService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private nativeStorage: NativeStorage,
              public plt: Platform) {
    if (this.plt.is('ios')) {

    }
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(HomePage);

            this.nativeStorage.setItem('registerCredentials', this.registerCredentials).then(
              () => console.log('Stored Login Data!'),
              error => console.error('Error storing LoginData', error)
            );

          });
        } else {
          this.showError("Acceso denegado");
        }
      },
      error => {
        this.showError(error);
      });
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
    let data_registerCredentials;
    this.nativeStorage.getItem('registerCredentials').then(data => {
      data_registerCredentials = data;
    });
    this.showLoading();
    this.auth.login(data_registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(HomePage);
          });
        } else {
          this.loading.dismiss();
          this.nav.setRoot(HomePage);
        }
      },
      error => {
        this.showError(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
