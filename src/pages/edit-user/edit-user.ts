import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';

import {DatePicker, ImagePicker} from 'ionic-native';

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
  public userObject;
  loading: Loading;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              public authService: AuthService) {
    this.user = JSON.parse(this.authService.getStringDataUser()).data;
    this.userObject = this.user;
    try {
      this.userObject.birth_date = new Date(this.user.birth_date).toISOString();
    } catch (error) {
      console.log(error);
      this.userObject.birth_date = new Date().toISOString();
    }
  }

  public editBirthDay() {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: 5
    }).then(
      date => {
        this.userObject.birth_date = date;
      },
      err => {
        console.log('Error occurred while getting date: ', err);
      });
  }

  public updateUser() {
    this.showLoading();
    this.userObject.birth_date = (new Date(this.userObject.birth_date)).toISOString().substring(0, 19).replace('T', ' ');
    let userDataToUpdate = {
      id: this.userObject.id,
      nickname: this.userObject.nickname,
      first_name: this.userObject.first_name,
      last_name: this.userObject.last_name,
      email: this.userObject.email,
      password: this.userObject.password,
      location: this.userObject.location,
      birth_date: this.userObject.birth_date,
      profile_avatar: ""
    };
    let ID_USER = this.userObject.id;
    this.authService.updateDataUser(userDataToUpdate, ID_USER).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            console.log(allowed);
            let response = JSON.parse(allowed._body);

            if (Object.keys(response.meta).length == 0) {
              let alert = this.alertCtrl.create({
                title: 'Usuario actualizado',
                subTitle: "Los datos del usuario han sido actualizados actualizado",
                buttons: ['OK']
              });
              alert.present(prompt);
            } else {
              if (typeof response.meta.nickname !== 'undefined') {
                this.showError(JSON.stringify(response.meta.nickname));
              }
              if (typeof response.meta.email !== 'undefined') {
                this.showError(JSON.stringify(response.meta.email));
              }
              if (typeof response.meta.password !== 'undefined') {
                this.showError(JSON.stringify(response.meta.password));
              } else {
                console.log("error in password");
              }
            }
          });
        }
      },
      error => {
        console.log("Error");
        console.log(error);
      }
    );
  }

  public openGallery(): void {
    let options = {
      maximumImagesCount: 1,
      width: 100,
      height: 100,
      quality: 90
    };
    ImagePicker.getPictures(options).then(
      (results) => {
        for (let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
        }
      },
      (err) => {
        this.showError(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }


  public showError(text: string) {
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}
