import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { DatePicker, ImagePicker } from 'ionic-native';

/*
  Generated class for the EditUser page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-edit-user',
    templateUrl: 'edit-user.html'
  })
  export class EditUserPage {
    public user;

    constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public authService: AuthService) {
      this.user = JSON.parse(this.authService.getStringDataUser()).data;
      console.log(new Date(this.user.birth_date).toISOString());
      this.user.birth_date = new Date(this.user.birth_date).toISOString();
      console.log(this.user);
    }

    public editBirthDay() {
      DatePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: 5
      }).then(
      date => {
        console.log('this.user.birth_date: ', date);
        this.user.birth_date = date;
      },
      err => {
        console.log('Error occurred while getting date: ', err);
      });
    }

    public updateUser(){
      console.log(this.user);
    }

    public openGallery():void {
      let options = {
        maximumImagesCount: 1, 
        width: 100,
        height: 100,
        quality: 90
      }
      ImagePicker.getPictures(options).then(
        (results) => {
          for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
          }
        }, 
        (err) => { 
          console.log(err);
        }
        );
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad EditUserPage');
    }

  }
