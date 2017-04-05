import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AddProductPage} from '../pages/add-product/add-product';
import {AjaxTestPage} from '../pages/ajax-test/ajax-test';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {Page1Page} from '../pages/page1/page1';
import {Page2Page} from '../pages/page2/page2';
import {ProductPage} from '../pages/product/product';
import {SearchPage} from '../pages/search/search';
import {UserPage} from '../pages/user/user';
import {RegisterPage} from '../pages/register/register';

import {AuthService} from "../providers/auth-service";
import {NativeStorage} from "@ionic-native/native-storage";

@NgModule({
  declarations: [
    MyApp,
    AddProductPage,
    AjaxTestPage,
    HomePage,
    LoginPage,
    Page1Page,
    Page2Page,
    ProductPage,
    SearchPage,
    UserPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddProductPage,
    AjaxTestPage,
    HomePage,
    LoginPage,
    Page1Page,
    Page2Page,
    ProductPage,
    SearchPage,
    UserPage,
    RegisterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    NativeStorage
  ]
})
export class AppModule {
}
