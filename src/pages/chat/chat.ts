import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../providers/users-service";
import { InsertMessage, ChatsService } from "../../providers/chats-service";
import { AuthService } from "../../providers/auth-service";
import { ServerService } from "../../providers/server-service";

@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {
	
	public chatParams;
	public user: User;
  public id_user_from;
  public id_user_to;
	public message;
	public chat;
	
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public authService: AuthService,
		public serverService: ServerService,
		public chatsService: ChatsService) {
		this.chat = [];
		this.message = "";
		this.user = this.authService.getUser();
    this.chatParams = navParams.get("chatContacts");
    this.id_user_from = this.user.id;
    this.id_user_to = this.chatParams.id_user;
		this.getChatByIdUsers();
	}

	private getChatByIdUsers() {
    this.chat = [];
    let id_user_from = this.id_user_from;
    let id_user_to = this.id_user_to;
    this.chatsService.getChatByIdUsers(id_user_from, id_user_to).subscribe(
      data => {
        if (data) {
          let response = JSON.parse(data.text());
          console.log(response);
          this.chat = response.data;
        }
      }
    );
  }

	public sendMessage() {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          let insertMessage = this.getInsertMessage();
          console.log(insertMessage);
          this.message = "";
          this.chatsService.sendMessage(insertMessage).subscribe(
            allowed => {
              console.log(allowed);
              if (allowed) {
                this.getChatByIdUsers();
              }
            }
          );
        }
      }
    );
  }

  public getInsertMessage(): InsertMessage {
  	let getInsertMessage: InsertMessage = {
  		id_user_from: this.id_user_from,
  		id_user_to: this.id_user_to,
  		message: this.message
  	}
  	return new InsertMessage(getInsertMessage);
  }
}
