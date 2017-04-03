import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {LoginPage} from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.userInfo = this.authService.getUserInfo();

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
