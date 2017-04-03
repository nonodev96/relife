import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {AjaxTestPage} from '../pages/ajax-test/ajax-test';

// import {Page1Page} from '../pages/page1/page1';
// import {Page2Page} from '../pages/page2/page2';
import {AddProductPage} from '../pages/add-product/add-product';
// import {UserPage} from '../pages/user/user';
// import {SearchPage} from '../pages/search/search';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // {title: 'Page Home', component: HomePage},
      // {title: 'Page AjaxTestPage', component: AjaxTestPage},
      // {title: 'Page AddProduct', component: AddProductPage},

      // {title: 'Page One', component: Page1Page},
      // {title: 'Page Two', component: Page2Page},
      // {title: 'Page UserPage', component: UserPage},
      // {title: 'Page SearchPage', component: SearchPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
