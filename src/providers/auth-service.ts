import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
    this.profile_avatar = user && (URL_IMAGE_USERS + user.profile_avatar) || "";
  }

  //endregion
}

const SERVER_URL = 'https://relifecloud-nonodev96.c9users.io/';
const SERVER_URL_API = SERVER_URL + 'api/';
const URL_IMAGE_USERS = SERVER_URL + "assets/images/users/";

@Injectable()
export class AuthService {

  //region ATTRIBUTES
  private _currentUser: User;
  private _stringDataUser;
  private _access = false;
  //endregion

  //region CONSTRUCTOR
  constructor(public http: Http) {

  }

  //endregion

  //region GETTER AND SETTER
  public getUser(): User {
    return this._currentUser;
  }

  public getStringDataUser(): string {
    return this._stringDataUser;
  }

  public getUserInfoObservable() {
    return Observable.create(
      observer => {
        if (this._access) {
          observer.next(this.getUser());
          observer.complete();
        } else {
          observer.next("Error en getUserInfoObservable");
          observer.complete();
        }
      }
    );
  }

  //endregion

  //region CONTROLLER
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Error en las credenciales.");
    } else {
      return Observable.create(
        observer => {
          // At this point make a request to your backend to make a real check!
          let link = SERVER_URL_API + 'user/login';
          let body = JSON.stringify({ email: credentials.email, password: credentials.password });
          this.http.post(link, body).subscribe(
            data => {

              // let json_meta = JSON.parse(data.text()).meta;
              let userObjectJSON = JSON.parse(data.text()).data;
              if (userObjectJSON.status == "succes") {
                let userObject = {
                  id: userObjectJSON.id,
                  nickname: userObjectJSON.nickname,
                  first_name: userObjectJSON.first_name,
                  last_name: userObjectJSON.last_name,
                  email: userObjectJSON.email,
                  password: userObjectJSON.password,
                  location: userObjectJSON.location,
                  join_date: userObjectJSON.join_date,
                  birth_date: userObjectJSON.birth_date,
                  profile_avatar: userObjectJSON.profile_avatar,
                };
                this._currentUser = new User(userObject);
                this._stringDataUser = JSON.stringify(this._currentUser);
                this._access = true;
                observer.next(this._access);
                observer.complete();
              } else {
                this._access = false;
                observer.next(this._access);
                observer.complete();
              }
            },
            err => {
              this._access = false;
              observer.next(err);
              observer.complete();
            }
          );
        }
      );

    }
  }

  public register() {
    return Observable.create(
      observer => {
        observer.next(true);
        observer.complete();
      }
    );
  }

  public updateDataUser(userObject, id) {
    return Observable.create(
      observer => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let link = SERVER_URL_API + 'user/' + id;
        let body = JSON.stringify(userObject);

        this.http.put(link, body, options).subscribe(
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

  public logout() {
    return Observable.create(
      observer => {
        this._currentUser = null;
        observer.next(true);
        observer.complete();
      }
    );
  }


  //endregion

  //region DEBUG
  static logError(err) {
    console.log(err);
  }

  static handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }

  //endregion
}
