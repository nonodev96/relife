import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, Loading, LoadingController, NavController,
  NavParams
} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {DomSanitizer} from '@angular/platform-browser';

import {DatePicker, Camera, ImagePicker} from 'ionic-native';

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
  //region ATTRIBUTES
  private _user;
  private _userObject;
  private _base64Image;
  private _loading: Loading;
  //endregion

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public navParams: NavParams,
              public domSanitizer: DomSanitizer,
              public authService: AuthService) {
    this._user = JSON.parse(this.authService.getStringDataUser()).data;
    this._userObject = this._user;
    try {
      this._userObject.birth_date = new Date(this._user.birth_date).toISOString();
    } catch (error) {
      console.log(error);
      this._userObject.birth_date = new Date().toISOString();
    }
  }

  //endregion

  //region GETTER AND SETTER
  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get userObject() {
    return this._userObject;
  }

  set userObject(value) {
    this._userObject = value;
  }

  get base64Image() {
    return this._base64Image;
  }

  set base64Image(value) {
    this._base64Image = value;
  }

  get loading(): Loading {
    return this._loading;
  }

  set loading(value: Loading) {
    this._loading = value;
  }

  //endregion

  //region CONTROLLER
  public editBirthDay() {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: 5
    }).then(
      date => {
        this._userObject.birth_date = date;
      },
      err => {
        console.log('Error occurred while getting date: ', err);
      });
  }

  public updateUser() {
    this.showLoading();
    this._userObject.birth_date = (new Date(this._userObject.birth_date)).toISOString().substring(0, 19).replace('T', ' ');
    let userDataToUpdate = {
      id: this._userObject.id,
      nickname: this._userObject.nickname,
      first_name: this._userObject.first_name,
      last_name: this._userObject.last_name,
      email: this._userObject.email,
      password: this._userObject.password,
      location: this._userObject.location,
      birth_date: this._userObject.birth_date,
      profile_avatar: this._base64Image
    };
    let ID_USER = this._userObject.id;
    this.authService.updateDataUser(userDataToUpdate, ID_USER).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
            this._loading.dismiss();
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

  //endregion

  //region COMPONENTS
  public selectCameraOrImagePicker() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Actualizar tu foto de perfil',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            this.openCamera();
          }
        }, {
          text: 'Elegir foto existente',
          handler: () => {
            this.openGallery();
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  public showError(text: string) {
    setTimeout(() => {
      this._loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  public showLoading() {
    this._loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this._loading.present();
  }

  //endregion

  //region NATIVE
  public openCamera(): void {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this._base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
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
          this._base64Image = this.domSanitizer.bypassSecurityTrustResourceUrl(results[i]);
        }
      },
      (err) => {
        this.showError(err);
      }
    );
  }

  //endregion

  //region Description
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  //endregion
}
