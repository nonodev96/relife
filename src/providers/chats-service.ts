import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

interface InterfaceInsertMessage {
  id_user_from: string | number;
  id_user_to: string | number;
  message: string;
}

export class InsertMessage implements InterfaceInsertMessage {
  id_user_from: string | number;
  id_user_to: string | number;
  message: string;

  constructor();
  constructor(insertMessage: InterfaceInsertMessage);
  constructor(insertMessage?: any) {
    this.id_user_from = insertMessage && insertMessage.id_user_from || "";
    this.id_user_to = insertMessage && insertMessage.id_user_to || "";
    this.message = insertMessage && insertMessage.message || "";
  }
}

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const SERVER_URL_API = SERVER_URL + "api/";
const SERVER_URL_CHATS = SERVER_URL_API + "chats";

@Injectable()
export class ChatsService {

  constructor(public http: Http) {

  }

  public getContactsByIdUser(id: string | number = 0) {
    let link = SERVER_URL_CHATS + "/getContacts/" + id;
    return Observable.create(
      observer => {
        this.http.get(link).subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            console.log(error);
            observer.next(false);
            observer.complete();
          }
        );
      }
    );
  }

  public getChatByIdUsers(id_1: string | number = 0, id_2: string | number = 0) {
    let link = SERVER_URL_CHATS + "/getChat/" + id_1 + "/" + id_2;
    return Observable.create(
      observer => {
        this.http.get(link).subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            console.log(error);
            observer.next(false);
            observer.complete();
          }
        );
      }
    );
  }

  public sendMessage(insertMessage: InsertMessage) {
    let url = SERVER_URL_CHATS;
    let body = JSON.stringify(insertMessage);
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});
    return Observable.create(
      observer => {
        this.http.post(url, body, options).subscribe(
          response => {
            observer.next(response);
            observer.complete();
          },
          error => {
            observer.next(error);
            observer.complete();
          }
        );
      }
    );
  }
}
