import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, Loading, LoadingController, NavController,
  NavParams
} from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service';
import { DomSanitizer } from '@angular/platform-browser';

import { DatePicker, Camera, ImagePicker } from 'ionic-native';

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
  private _user: User;
  private _userObject: User;
  private _base64Image;
  private _image;
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
    this._user = JSON.parse(this.authService.getStringDataUser());
    this._userObject = this._user;
    this._userObject.password = "Holamundo1";
    try {
      this._userObject.birth_date = new Date(this._user.birth_date).toISOString();
    } catch (error) {
      console.log(error);
      this._userObject.birth_date = new Date().toISOString();
    }
  }

  //endregion

  //region GETTER AND SETTER
  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get userObject(): User {
    return this._userObject;
  }

  set userObject(value: User) {
    this._userObject = value;
  }

  get base64Image() {
    return this._base64Image;
  }

  set base64Image(value) {
    this._base64Image = value;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
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
            let response = JSON.parse(allowed.text());

            if (Object.keys(response.meta).length == 0) {
              let alert = this.alertCtrl.create({
                title: 'Usuario ' + this._userObject.nickname + ' actualizado ',
                subTitle: "Los datos del usuario han sido actualizados correctamente",
                buttons: [ 'OK' ]
              });
              alert.present(prompt);
            } else {
              if (typeof response.meta.nickname !== 'undefined') {
                this.showError((response.meta.nickname));
              }
              if (typeof response.meta.email !== 'undefined') {
                this.showError((response.meta.email));
              }
              if (typeof response.meta.password !== 'undefined') {
                this.showError(response.meta.password);
              }
            }

          });
        }
      },
      error => {
        console.log("Error updateDataUser");
        setTimeout(() => {
          this._loading.dismiss();
          console.log("Error setTimeout");
        });
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
      buttons: [ 'OK' ]
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
    let options = {
      destinationType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.PNG,
      saveToPhotoAlbum: true,
      targetWidth: 1000,
      targetHeight: 1000
    };
    Camera.getPicture(options).then((imageData) => {
      // imageData is a base64 encoded string
      this._base64Image = "data:image/png;base64," + imageData;
      this._image = this._base64Image
    }, (err) => {
      console.log(err);
    });
  }

  public openGallery(): void {
    let options = {
      maximumImagesCount: 1,
      quality: 100,
      height: 250,
      width: 250,
      // outputType: 1
    };
    ImagePicker.getPictures(options).then(
      (results) => {
        for (let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[ i ]);
          this._image = this.domSanitizer.bypassSecurityTrustResourceUrl(results[i]);
          this._base64Image = this.encodeImageUri(results[ i ]);
        }
      },
      (err) => {
        this.showError(err);
      }
    );
  }

  private encodeImageUri(imageUri) {
    let c = document.createElement('canvas');
    let ctx = c.getContext("2d");
    let img = new Image();
    img.onload = function () {
      c.width = this.width;
      c.height = this.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageUri;
    return c.toDataURL("image/jpeg");
  }


  //endregion

  //region Description
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  //endregion
}
