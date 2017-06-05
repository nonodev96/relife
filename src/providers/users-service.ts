import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface InterfaceUser {
  id: string;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string;
  join_date: any;
  birth_date: any;
  profile_avatar: string;
}
export class User implements InterfaceUser {
  //region ATTRIBUTES
  id: string;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  location: string;
  join_date: any;
  birth_date: any;
  profile_avatar: string;

  //endregion

  //region CONSTRUCTOR
  constructor();
  constructor(user: InterfaceUser);
  constructor(user?: any) {
    this.id = user && user.id || "";
    this.nickname = user && user.nickname || "";
    this.first_name = user && user.first_name || "";
    this.last_name = user && user.last_name || "";
    this.email = user && user.email || "";
    this.password = user && user.password || "";
    this.location = user && user.location || "";
    this.join_date = user && user.join_date || "";
    this.birth_date = user && user.birth_date || "";
    this.profile_avatar = user && user.profile_avatar || "";
  }

  //endregion
}

const SERVER_URL = "https://relifecloud-nonodev96.c9users.io/";
const SERVER_URL_API = SERVER_URL + "api/";
const SERVER_URL_USER = SERVER_URL_API + "user";

@Injectable()
export class UsersService {

  //region CONSTRUCTOR
  constructor(public http: Http) {

  }
  //endregion

  //region CONSTRUCTOR
  public getUserById(id) {
  	let link = SERVER_URL_USER + "/" + id;
    return Observable.create(
      observer => {
        this.http.get(link).subscribe(
          data => {
            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(false);
            observer.complete();
          }
        );
      }
    );
  }

  //endregion
}