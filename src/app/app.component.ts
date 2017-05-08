import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { AddProductPage } from '../pages/add-product/add-product';
import { UserPage } from '../pages/user/user';
import { LoginPage } from '../pages/login/login';
import { SlidesToolTipsPage } from "../pages/slides-tool-tips/slides-tool-tips";
import { AuthService } from "../providers/auth-service";
import { SharedService } from "../providers/shared-service";
import { ServerService } from "../providers/server-service";

type UserApp = {
  nickname: string,
  profile_avatar: string,
  email: string
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  //region ATTRIBUTES
  @ViewChild(Nav)
  private _nav: Nav;
  private _pages: Array<{ title: string, component: any, nav: string }>;
  private _rootPage;
  private _user: UserApp;
  //endregion

  //region CONSTRUCTOR
  constructor(public sharedService: SharedService,
              public platform: Platform,
              public server: ServerService,
              public authService: AuthService,
              public storage: Storage,
              public menuController: MenuController) {
    this._user = {
      profile_avatar: '',
      nickname: 'Cargando...',
      email: 'Cargando...'
    };
    this._pages = [
      { title: 'Inicio', component: HomePage, nav: 'setRoot' },
      { title: 'Añadir producto', component: AddProductPage, nav: 'push' },
      { title: 'Consejos', component: SlidesToolTipsPage, nav: 'setRoot' },
    ];
    this.initializeApp();
    this.logingAppComponents();
  }

  //endregion

  //region GETTER AND SETTER

  get nav(): Nav {
    return this._nav;
  }

  set nav(value: Nav) {
    this._nav = value;
  }

  get pages(): Array<{ title: string; component: any; nav: string }> {
    return this._pages;
  }

  set pages(value: Array<{ title: string; component: any; nav: string }>) {
    this._pages = value;
  }

  get rootPage(): any {
    return this._rootPage;
  }

  set rootPage(value: any) {
    this._rootPage = value;
  }

  get user(): { nickname: string; profile_avatar: string; email: string } {
    return this._user;
  }

  set user(value: { nickname: string; profile_avatar: string; email: string }) {
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
    this.server.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed == true) {
          this.storage.ready().then(
            () => {
              let credentials = {
                email: '',
                password: '',
                loging: ''
              };
              this.storage.get("_email").then(
                data => {
                  credentials.email = data;
                }
              );
              this.storage.get("_password").then(
                data => {
                  credentials.password = data;
                }
              );
              this.storage.get("_loging").then(
                data => {
                  credentials.loging = data;
                  if (data == "TRUE") {
                    this.authService.login(credentials).subscribe(
                      allowed => {
                        if (allowed) {
                          setTimeout(() => {
                            this.sharedService.setEmitterUser(this.authService.getUserInfo());
                            this._user = this.authService.getUserInfo();
                            this.menuController.get().enable(true);
                            let ret = this._nav.setRoot(HomePage);
                            if (ret) console.log(ret);
                          });
                        } else {
                          this._rootPage = LoginPage;
                        }
                      },
                      error => {
                        console.log(error);
                      }
                    );
                  } else {
                    this._rootPage = LoginPage;
                  }
                }
              );
            }
          );
        } else {
          this._rootPage = LoginPage;
        }
      }
    );
  }

  openProfile() {
    this.openPage({ title: 'Perfil', component: UserPage, nav: 'push' })
  }

  openPage(page) {
    let ret: any;
    switch (page.nav) {
      case 'setRoot':
        ret = this._nav.setRoot(page.component);
        break;
      case 'push':
        ret = this._nav.push(page.component);
        break;
      case 'pop':
        ret = this._nav.pop(page.component);
        break;
      default:
        ret = this._nav.setRoot(page.component);
        break;
    }
    console.log(ret);
  }

  logOutMenuButton() {
    this.authService.logout().subscribe(
      () => {
        let ret: any;
        ret = this.storage.set("_loging", "FALSE");
        if (ret) console.log();
        this.menuController.get().enable(false);
        ret = this._nav.setRoot(LoginPage);
        if (ret) console.log();
      },
      error => {
        console.log(error);
      }
    );
  }

  //endregion

  //region IMPLEMENTS
  ngOnInit(): void {
    this.sharedService.getEmittedUser().subscribe(
      item => {
        if (typeof item != 'undefined') {
          this._user = item;
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  //endregion
}
