///<reference path="../../providers/products-service.ts"/>
import { Component } from '@angular/core';
import { AlertController, NavController, Loading, LoadingController, ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InsertProduct } from "../../providers/products-service";
import { AuthService } from "../../providers/auth-service";

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {

  //region ATTRIBUTES
  private _insertProduct: FormGroup;
  private _image;
  private _base64Image;
  private _loading: Loading;
  selectOptions;
  _selected: string = "0";

  //endregion

  //region CONSTRUCTOR
  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private actionSheetCtrl: ActionSheetController) {
    this._insertProduct = this.formBuilder.group(
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
    this.selectOptions = {
      title: 'Categorías',
      subTitle: 'Selecciona una categoría'
    };

  }

  //endregion

  //region GETTER AND SETTER
  get insertProduct(): FormGroup {
    return this._insertProduct;
  }

  set insertProduct(value: FormGroup) {
    this._insertProduct = value;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
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

  get selected(): string {
    return this._selected;
  }

  set selected(value: string) {
    this._selected = value;
  }

  //endregion

  //region CONTROLLER
  public addProduct() {
    let insertProduct = this.getInsertProduct();
    console.log(insertProduct);
  }

  public getInsertProduct(): InsertProduct {
    let id_user = this.authService.getUser().id;
    let title = this.insertProduct.value.title;
    let description = this.insertProduct.value.description;
    let starting_price = this.insertProduct.value.starting_price;
    let image = this.insertProduct.value.image;
    let location = this.insertProduct.value.location;
    let category = this.insertProduct.value.category;
    let insertProductObject = {
      id_user: id_user,
      title: title,
      description: description,
      starting_price: starting_price,
      image: image,
      location: location,
      category: category
    };
    return new InsertProduct(insertProductObject);
  }

  //noinspection JSMethodCanBeStatic
  public categories() {
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
      "Otros"
    ];
    let categoriesReturn = [ {
      value: 0,
      name: "Otras Categorías",
    } ];
    for (let key in categories) {
      let value = parseInt(key) + 1;
      let name = categories[ key ];
      categoriesReturn.push({
        value: value,
        name: name
      });
    }
    return categoriesReturn;
  }

  //endregion

  //region COMPONENTS
  public selectCameraOrImagePicker() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar una foto de...',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    //noinspection JSIgnoredPromiseFromCall
    actionSheet.present();
  }

  public showError(text: string, title: string = "Error") {
    setTimeout(() => {
      //noinspection JSIgnoredPromiseFromCall
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
  //noinspection JSMethodCanBeStatic
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  //endregion
}
