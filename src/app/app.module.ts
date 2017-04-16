import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {IonicStorageModule} from '@ionic/storage';
import {NativeStorage} from "@ionic-native/native-storage";
import {AuthService} from "../providers/auth-service";
import {ProductsService} from "../providers/products-service";

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
import { EditUserPage } from "../pages/edit-user/edit-user";

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
  RegisterPage,
  EditUserPage
  ],
  imports: [
  IonicModule.forRoot(MyApp, 
  {
    monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthShortNames: ["Enero", "Feb", "Marzo", "Abr", "Mayo", "Jun", "Jul", "Agosto", "set", "Oct", "Nov", "Dic"],
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayShortNames: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  }),
  IonicStorageModule.forRoot()
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
  RegisterPage,
  EditUserPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthService,
  ProductsService,
  NativeStorage
  ]
})
export class AppModule {
}
