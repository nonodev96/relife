import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from "@ionic-native/native-storage";
import { Crop } from "ionic-native";

import { AddProductPage } from '../pages/add-product/add-product';
import { AjaxTestPage } from '../pages/ajax-test/ajax-test';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { Page1Page } from '../pages/page1/page1';
import { Page2Page } from '../pages/page2/page2';
import { ProductPage } from '../pages/product/product';
import { SearchPage } from '../pages/search/search';
import { UserPage } from '../pages/user/user';
import { RegisterPage } from '../pages/register/register';
import { EditUserPage } from "../pages/edit-user/edit-user";
import { SlidesToolTipsPage } from "../pages/slides-tool-tips/slides-tool-tips";

import { ServerService } from "../providers/server-service";
import { AuthService } from "../providers/auth-service";
import { SharedService } from "../providers/shared-service";
import { ProductsService } from "../providers/products-service";
import { FavoritesPage } from "../pages/favorites/favorites";
import { SearchFiltersModal } from "../pages/search-filters-modal/search-filters-modal";
import { SignUpPage } from "../pages/sign-up/sign-up";

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
    EditUserPage,
    SlidesToolTipsPage,
    FavoritesPage,
    SearchFiltersModal,
    SignUpPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,
      {
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        // monthShortNames: ["Enero", "Feb", "Marzo", "Abr", "Mayo", "Jun", "Jul", "Agosto", "set", "Oct", "Nov", "Dic"],
        monthShortNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
        dayShortNames: [ "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb" ],
      }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [ IonicApp ],
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
    EditUserPage,
    SlidesToolTipsPage,
    FavoritesPage,
    SearchFiltersModal,
    SignUpPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServerService,
    AuthService,
    SharedService,
    ProductsService,
    NativeStorage,
    Crop
  ]
})
export class AppModule {
}
