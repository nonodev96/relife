import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ChatPage } from "../chat/chat";
import { User } from "../../providers/users-service";
import { ChatsService } from "../../providers/chats-service";
import { AuthService } from "../../providers/auth-service";
import { ServerService } from "../../providers/server-service";

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const URL_IMG_USERS = SERVER_URL + "assets/images/users/";
const URL_IMG_PRODUCTS = SERVER_URL + "assets/images/products/";
const IMG_USERS_DEFAULT = "default.jpg";
const IMG_PRODUCTS_DEFAULT = "default.png";

@Component({
  selector: "page-contacts",
  templateUrl: "contacts.html"
})
export class ContactsPage {
	public list_contacts;
  public user: User;

  public URL_IMG_USERS = URL_IMG_USERS;
  public URL_IMG_PRODUCTS = URL_IMG_PRODUCTS;
  public IMG_USERS_DEFAULT = IMG_USERS_DEFAULT;
  public IMG_PRODUCTS_DEFAULT = IMG_PRODUCTS_DEFAULT;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService,
              public serverService: ServerService,
              public chatsService: ChatsService) {
  	this.user = this.authService.getUser();
    this.list_contacts = [];
    this.getContactsByIdUser();
  }

  public getContactsByIdUser() {
    let id_user = this.user.id;
    this.chatsService.getContactsByIdUser(id_user).subscribe(
      data => {
        if (data) {
          setTimeout(() => {
            let response = JSON.parse(data.text());
            this.list_contacts = response.data;
          });
        }
      }
    );
  }

	//region COMPONENTS
  public openChatPage(contacts) {
    this.navCtrl.push(ChatPage, {chatContacts: contacts});
  }

  public doRefresh(refresher) {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          let id_user = this.user.id;
			    this.chatsService.getContactsByIdUser(id_user).subscribe(
            data => {
              if (data) {
                let response = JSON.parse(data.text());
		            this.list_contacts = response.data;
                refresher.complete();
              } else {
                refresher.cancel();
              }
            }
          );
        } else {
          refresher.complete();
        }
      }
    );
  }

  //endregion


}
