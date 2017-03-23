import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {HomePage} from '../pages/home/home';
import {ProductPage} from '../pages/product/product';
import {AddProductPage} from '../pages/add-product/add-product';
import {UserPage} from '../pages/user/user';
import {SearchPage} from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    ProductPage,
    AddProductPage,
    UserPage,
    SearchPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    HomePage,
    ProductPage,
    AddProductPage,
    UserPage,
    SearchPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
