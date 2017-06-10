import { Component } from "@angular/core";
import { AlertController, Loading, LoadingController, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { UsersService, User } from "../../providers/users-service";
import { Product, ProductsService } from "../../providers/products-service";
import * as moment from "moment";
import { FavoritesService, InsertFavorite } from "../../providers/favorites-service";
import { ServerService } from "../../providers/server-service";
import { InsertBid, SalesService } from "../../providers/sales-service";
import { AuthService } from "../../providers/auth-service";

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const URL_IMG_USERS = SERVER_URL + "assets/images/users/";
const URL_IMG_PRODUCTS = SERVER_URL + "assets/images/products/";
const IMG_USERS_DEFAULT = "default.jpg";
const IMG_PRODUCTS_DEFAULT = "default.png";

@Component({
  selector: "page-product",
  templateUrl: "product.html"
})
export class ProductPage {

  //region ATTRIBUTTES
  public productParams: Product;
  public product: Product;
  public user: User;
  public backgroundRandomUser;
  public loading: Loading;

  public URL_IMG_USERS = URL_IMG_USERS;
  public URL_IMG_PRODUCTS = URL_IMG_PRODUCTS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  public IMG_PRODUCTS_DEFAULT = IMG_PRODUCTS_DEFAULT;
  //endregion

  //region CONSTRUCTOR
  constructor(public productService: ProductsService,
              public authService: AuthService,
              public serverService: ServerService,
              public salesService: SalesService,
              public favoriteService: FavoritesService,
              public usersService: UsersService,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public http: Http) {
    this.productParams = navParams.get("product");
    this.product = new Product(this.productParams);
    this.user = new User();
    this.getProduct(this.productParams.id);
    this.getUser(this.productParams.id_user);
    let listBackground = [
      { backgroundUrl: "assets/imgs/card-saopaolo.png" },
      { backgroundUrl: "assets/imgs/card-madison.png" },
      { backgroundUrl: "assets/imgs/card-sf.png" },
      { backgroundUrl: "assets/imgs/card-amsterdam.png" }
    ];
    let random = this.randomInt(0, listBackground.length - 1);
    this.backgroundRandomUser = listBackground[ random ].backgroundUrl;
  }

  //endregion

  //region CONTROLLERS
  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private getProduct(id) {
    this.productService.getProductById(id).subscribe(
      allowed => {
        this.product = JSON.parse(allowed.text()).data;
        let datetime_product_moment = moment(this.product.datetime_product);
        this.product.datetime_product = datetime_product_moment.locale("es").format("D [de] MMMM [del] YYYY");
      }
    );
  }

  private getUser(id) {
    this.usersService.getUserById(id).subscribe(
      allowed => {
        let json_response = JSON.parse(allowed.text());
        let user_data = json_response.data;
        this.user = new User(user_data);
      }
    );
  }

  private addBid(insertBid) {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          this.showLoading("Añadiendo puja...");
          this.salesService.addBid(insertBid).subscribe(
            allowed => {
              console.log(allowed);
              if (allowed) {
                setTimeout(() => {
                  this.loading.dismiss();
                  this.getProduct(this.product.id);
                });
              }
            }
          );
        }
      }
    );
  }

  private addFavorite(insertFavorite: InsertFavorite) {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          this.showLoading("Añadiendo a favoritos...");
          this.favoriteService.addFavorite(insertFavorite).subscribe(
            allowed => {
              console.log(allowed);
              if (allowed) {
                setTimeout(() => {
                  this.loading.dismiss();
                  this.getProduct(this.product.id);
                });
              }
            }
          );
        }
      }
    );
  }

  //endregion

  //region COMPONENTS
  private getInsertBid(data) {
    let insertBid: InsertBid = {
      id_user: this.authService.getUser().id,
      id_product: this.product.id,
      bid: data
    };
    return new InsertBid(insertBid);
  }

  private getInsertFavorite(): InsertFavorite {
    let insertFavorite: InsertFavorite = {
      id_user: this.authService.getUser().id,
      id_product: this.product.id
    };
    return new InsertFavorite(insertFavorite);
  }

  public presentPromptBids() {
    let prompt = this.alertCtrl.create({
      title: "Pujar",
      message: this.product.title,
      inputs: [
        {
          name: "bid",
          placeholder: "Ej: 24€",
          type: "number",
          min: 0
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("Cancelado, " + this.product.title + " no se añadira ninguna puja");
          }
        },
        {
          text: "Pujar",
          handler: data => {
            let bid = data.bid;
            let insertBid = this.getInsertBid(bid);
            console.log(insertBid);
            this.addBid(insertBid);
          }
        }
      ]
    });
    prompt.present();
  }

  public presentPromptFavorites() {
    let confirm = this.alertCtrl.create({
      title: "¿Quieres añadir a tu lista de favoritos?",
      message: this.product.title,
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            console.log("Cancelado, " + this.product.title + " no será añadido a favoritos");
          }
        },
        {
          text: "Añadir a favoritos",
          handler: () => {
            let insertFavorite = this.getInsertFavorite();
            console.log(insertFavorite);
            this.addFavorite(insertFavorite);
          }
        }
      ]
    });
    confirm.present();
  }

  public showLoading(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  //endregion
}
