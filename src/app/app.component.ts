import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
// import {AjaxTestPage} from '../pages/ajax-test/ajax-test';
// import {Page1Page} from '../pages/page1/page1';
// import {Page2Page} from '../pages/page2/page2';
import { AddProductPage } from '../pages/add-product/add-product';
import { UserPage } from '../pages/user/user';
// import {SearchPage} from '../pages/search/search';
import { LoginPage } from '../pages/login/login';
import { SlidesToolTipsPage } from "../pages/slides-tool-tips/slides-tool-tips";
import { AuthService } from "../providers/auth-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  //region ATTRIBUTES
  @ViewChild(Nav) nav: Nav;
  public _user = { profile_avatar: '', nickname: 'Cargando...', email: 'Cargando...' };
  //endregion
  pages: Array<{ title: string, component: any, nav: string }>;

  rootPage: any = LoginPage;

  //region CONSTRUCTOR
  constructor(public platform: Platform,
              public auth: AuthService,
              public storage: Storage,
              public menuController: MenuController) {
    this.initializeApp();
    this.pages = [
      { title: 'UserPage', component: UserPage, nav: 'push' },
      { title: 'Home', component: HomePage, nav: 'setRoot' },
      { title: 'AddProduct', component: AddProductPage, nav: 'push' },
      { title: 'Tool tips', component: SlidesToolTipsPage, nav: 'setRoot' },
    ];

    this.storage.ready().then(() => {
      let credentials = { email: '', password: '', loging: '' };
      this.storage.get("_email").then(data => {
        credentials.email = data;
      });
      this.storage.get("_password").then(data => {
        credentials.password = data;
      });
      this.storage.get("_loging").then(data => {
        credentials.loging = data;
        if (data == "TRUE") {
          console.log("MECAGO EN TOOOO");
          console.log(credentials);
          this.auth.login(credentials).subscribe(
            allowed => {
              if (allowed) {
                setTimeout(() => {

                  this._user.profile_avatar = this.auth.getUserInfo().profile_avatar;
                  this._user.nickname = this.auth.getUserInfo().nickname;
                  this._user.email = this.auth.getUserInfo().email;

                  this.menuController.get().enable(true);
                  this.nav.setRoot(HomePage);
                });
              }
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    });
  }

  //endregion

  //region GETTER AND SETTER

  //endregion

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  logingAppComponents(credentials) {
    this.auth.login(credentials).subscribe(
      allowed => {
        if (allowed) {
          setTimeout(() => {
            this._user.profile_avatar = this.auth.getUserInfo().profile_avatar;
            this._user.nickname = this.auth.getUserInfo().nickname;
            this._user.email = this.auth.getUserInfo().email;
            this.menuController.get().enable(true);
            this.nav.setRoot(HomePage);
          });
        } else {
          console.log("No allowed");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  openPage(page) {
    switch (page.nav) {
      case 'setRoot':
        this.nav.setRoot(page.component);
        break;
      case 'push':
        this.nav.push(page.component);
        break;
      case 'pop':
        this.nav.pop(page.component);
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }

  logOutMenuButton() {
    this.auth.logout().subscribe(
      allowed => {
        this.storage.set("_loging", "FALSE");
        this.menuController.get().enable(false);
        this.nav.setRoot(LoginPage);
      },
      error => {
        console.log(error);
      }
    );
  }
}
