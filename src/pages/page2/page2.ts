import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2Page {
  //region ATTRIBUTES
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  //endregion

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
    this.icons = [
      'flask',
      'wifi',
      'beer',
      'football',
      'basketball',
      'paper-plane',
      'american-football',
      'boat',
      'bluetooth',
      'build'
    ];
    this.items = [];
    for (let i = 1; i < this.icons.length + 1; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[ Math.floor(Math.random() * this.icons.length) ]
      });
    }
  }

  //endregion

  //region CONTROLLER
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Page2Page, {
      item: item
    });
  }

  //endregion
}
