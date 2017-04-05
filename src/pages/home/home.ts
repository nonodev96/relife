import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';
import {LoginPage} from '../login/login';
import {AuthService} from '../../providers/auth-service';


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
  userInfo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              public nativeStorage: NativeStorage) {
    this.userInfo = this.authService.getUserInfo();

  }

  public clickStorage() {
    this.nativeStorage.getItem('registerCredentials').then(data => {
      let str = JSON.stringify(data);

      console.log(str);
    });
  }

  public logout() {
    this.authService.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
