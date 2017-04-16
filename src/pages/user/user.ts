import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { EditUserPage } from "../edit-user/edit-user";

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
   public user;
   public listBackground;
   public backgroundRandom;

   constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private authService: AuthService) {
     this.listBackground = [
       {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-saopaolo.png'},
       {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-madison.png'},
       {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-sf.png'},
       {backgroundUrl: 'https://ionicframework.com/dist/preview-app/www/assets/img/card-amsterdam.png'}
     ];
     let random = this.randomInt(0, this.listBackground.length-1);
     this.backgroundRandom = this.listBackground[random].backgroundUrl;
     this.user = JSON.parse(this.authService.getStringDataUser()).data;
     
     // this.navCtrl.setRoot(HomePage);
     // this.navCtrl.popToRoot();
   }


   private randomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
   }

   public openEditUser() {
     this.navCtrl.push(EditUserPage);
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad UserPage');
   }

 }
