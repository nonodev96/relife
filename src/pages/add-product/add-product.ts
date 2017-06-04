import { Component } from '@angular/core';
import {
  AlertController, NavController, Loading, LoadingController, ActionSheetController,
  ToastController
} from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { InsertProduct, ProductsService } from "../../providers/products-service";
import { AuthService } from "../../providers/auth-service";
import { ServerService } from "../../providers/server-service";

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {

  //region ATTRIBUTES
  private _insertProduct: FormGroup;
  private _loading: Loading;
  private _image;
  private _base64Image;
  selectOptions;
  _selected: string = "0";

  //endregion

  //region CONSTRUCTOR
  constructor(public camera: Camera,
              private authService: AuthService,
              private productsService: ProductsService,
              private serverService: ServerService,
              private formBuilder: FormBuilder,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
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
        starting_price: [ '', Validators.required ],
      }
    );
    this._image = "assets/imgs/camera-background-xhdpi-screen.png";
    this._base64Image = "";
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

  get base64Image() {
    return this._base64Image;
  }

  set base64Image(value) {
    this._base64Image = value;
  }

  //endregion

  //region CONTROLLER
  public addProduct() {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          this.showLoading();
          let insertProduct = this.getInsertProduct();
          console.log(insertProduct);
          let insertProductValid = this.isValidInsertProduct(insertProduct);
          if (insertProductValid) {
            this.productsService.addProduct(insertProduct).subscribe(
              allowed => {
                if (allowed) {
                  setTimeout(() => {
                    this._loading.dismiss();
                    console.log(allowed);
                    this.navCtrl.popAll();
                  });
                }
              }
            );
          } else {
            this.showError("Es necesaria la imagen del producto", "");
          }
        } else {
          this.presentToast('El servicio no está disponible');
        }
      }
    );
  }

  private getInsertProduct(): InsertProduct {
    let id_user = this.authService.getUser().id;
    let title = this.insertProduct.value.title;
    let description = this.insertProduct.value.description;
    let starting_price = this.insertProduct.value.starting_price;
    let image = this._base64Image;
    let location = this.insertProduct.value.location;
    let category = this.insertProduct.value.category;
    let insertProductObject: InsertProduct = {
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

  private isValidInsertProduct(insertProduct: InsertProduct): boolean {
    return insertProduct.image != "";
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

  public showError(subTitle: string, title: string = "Error") {
    setTimeout(() => {
      //noinspection JSIgnoredPromiseFromCall
      this._loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [ 'OK' ]
    });
    return alert.present(prompt);
  }

  public showLoading() {
    this._loading = this.loadingCtrl.create({
      content: 'Subiendo producto...'
    });
    this._loading.present();
  }

  private presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    return toast.present();
  }

  //endregion

  //region NATIVE
  public openCamera(): void {
    let options = {
      destinationType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true,
      targetWidth: 1000,
      targetHeight: 1000
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is a base64 encoded string
        this._image = "data:image/png;base64," + imageData;
        this._base64Image = "data:image/png;base64," + imageData;
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
