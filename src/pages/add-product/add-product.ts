import { Component } from '@angular/core';
import { AlertController, NavController, Loading, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

type Category = {
  id: number,
  name: string
}
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {

  //region ATTRIBUTES
  private insertProduct: FormGroup;
  private _image;
  private _categories: Array<Category>;
  private _selectOptions;
  private _loading: Loading;

  //endregion

  //region CONSTRUCTOR
  constructor(private formBuilder: FormBuilder,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private actionSheetCtrl: ActionSheetController) {
    this.insertProduct = this.formBuilder.group(
      {
        user_id: [ '' ],
        title: [ '', Validators.required ],
        description: [ '', Validators.required ],
        location: [ '', Validators.required ],
        category: [ '', ],
        starting_price: [ '', ],
      }
    );
    this._image = "assets/imgs/camera-background-xhdpi-screen.png";
    this._selectOptions = {
      title: 'Categorías',
      subTitle: 'Selecciona una categoría'
    };
    let categories = [
      "Coches",
      "Motor y Accesorios",
      "Electrónica",
      "Deporte y Ocio",
      "Muebles, Deco y Jardín",
      "Consolas y Videojuegos",
      "Libros, Películas y Música",
      "Moda y Accesorios",
      "Niños y Bebés",
      "Inmobiliaria",
      "Electrodomésticos",
      "Servicios",
      "Otros",
    ];
    this._categories = [];
    for (let key in categories) {
      let value = categories[ key ];
      let id = parseInt(key) + 1;
      this._categories.push({
        id: id,
        name: value
      });
    }
  }

  //endregion

  //region GETTER AND SETTER
  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  get categories(): Array<Category> {
    return this._categories;
  }

  set categories(value: Array<Category>) {
    this._categories = value;
  }

  //endregion

  //region CONTROLLER
  public addProduct() {
    console.log(this.insertProduct);
    console.log(this.insertProduct.value);
  }

  public selectCategoryCancel() {
    console.log('Gaming Select, Cancel');
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
        }, /*
         {
         text: 'Elegir foto existente',
         handler: () => {
         this.openGallery();
         }
         },*/
        {
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

  public showError(text: string, title: string = "Error") {
    setTimeout(() => {
      this._loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: title,
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
    Camera.getPicture(options).then(
      (imageData) => {
        // imageData is a base64 encoded string
        this._image = "data:image/png;base64," + imageData;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //endregion

  //region DEBUG
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  //endregion
}
