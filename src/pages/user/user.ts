import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
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
  user;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService) {
    this.user = JSON.parse(this.authService.getStringDataUser()).data;
    // this.navCtrl.setRoot(HomePage);
    // this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
