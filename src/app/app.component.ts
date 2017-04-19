import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Storage} from '@ionic/storage';

import {HomePage} from '../pages/home/home';
// import {AjaxTestPage} from '../pages/ajax-test/ajax-test';
// import {Page1Page} from '../pages/page1/page1';
// import {Page2Page} from '../pages/page2/page2';
import {AddProductPage} from '../pages/add-product/add-product';
import {UserPage} from '../pages/user/user';
// import {SearchPage} from '../pages/search/search';
import {LoginPage} from '../pages/login/login';
import {SlidesToolTipsPage} from "../pages/slides-tool-tips/slides-tool-tips";
import {AuthService} from "../providers/auth-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user;

  rootPage: any = LoginPage;
  //rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, nav: string }>;

  constructor(public platform: Platform,
              public auth: AuthService,
              public storage: Storage,
              public menuController: MenuController) {
    this.user = [];
    this.pages = [
      {title: 'UserPage', component: UserPage, nav: 'push'},
      {title: 'Home', component: HomePage, nav: 'setRoot'},
      {title: 'AddProduct', component: AddProductPage, nav: 'push'},
      {title: 'Tool tips', component: SlidesToolTipsPage, nav: 'setRoot'},
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(
      () => {
        StatusBar.styleDefault();
        Splashscreen.hide();
      }
    );
    this.storage.ready().then(() => {
      let credentials = [];
      this.storage.get("email").then(data => {
        credentials["email"] = data;
      });
      this.storage.get("password").then(data => {
        credentials["password"] = data;
      });
      this.storage.get("loging").then(data => {
        credentials["loging"] = data;
        if (data == "TRUE") {
          this.logingAppComponents(credentials);
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

  private logingAppComponents(credentials) {
    this.auth.login(credentials).subscribe(
      allowed => {
        if (allowed) {
          this.user = JSON.parse(JSON.stringify(this.auth.getUserInfo()));
          // this.user = {email:'name', first_name:'antonio'};
          this.menuController.get().enable(true);
          this.nav.setRoot(HomePage);
        } else {
          console.log("No allowed");
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
