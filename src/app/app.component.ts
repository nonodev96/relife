import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SharedService } from "../providers/shared-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  //region ATTRIBUTES
  @ViewChild(Nav)
  private nav: Nav;
  pages: Array<{ title: string, component: any, nav: string }>;
  rootPage: any = LoginPage;
  public _user;
  //endregion

  //region CONSTRUCTOR
  constructor(public sharedService: SharedService,
              public platform: Platform,
              public auth: AuthService,
              public storage: Storage,
              public menuController: MenuController) {
    this._user = { profile_avatar: '', nickname: 'Cargando...', email: 'Cargando...' };
    this.pages = [
      { title: 'UserPage', component: UserPage, nav: 'push' },
      { title: 'Home', component: HomePage, nav: 'setRoot' },
      { title: 'AddProduct', component: AddProductPage, nav: 'push' },
      { title: 'Tool tips', component: SlidesToolTipsPage, nav: 'setRoot' },
    ];
    this.initializeApp();
    this.logingAppComponents();

  }

  //endregion

  //region GETTER AND SETTER

  get user(): { profile_avatar: string; nickname: string; email: string } {
    return this._user;
  }

  set user(value: { profile_avatar: string; nickname: string; email: string }) {
    this._user = value;
  }

//endregion

  //region CONTROLLER
  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.menuController.get().enable(false);
    });
  }

  logingAppComponents() {
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
          console.log("ME CAGO EN TOOOO");
          console.log(credentials);
          this.auth.login(credentials).subscribe(
            allowed => {
              if (allowed) {
                setTimeout(() => {
                  this.sharedService.setEmitterUser(this.auth.getUserInfo());

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

  //endregion

  //region IMPLEMENTS
  ngOnInit(): void {
    this.sharedService.getEmittedUser().subscribe(item => this._user = item);
  }

  //endregion
}
