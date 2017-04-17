import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

export class User {
  id: string;
  nickname: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  join_date: string;
  birth_date: string;
  profile_avatar: string;

  constructor(id: string,
              nickname: string,
              first_name: string,
              last_name: string,
              email: string,
              location: string,
              join_date: string,
              birth_date: string,
              profile_avatar: string) {
    this.id = id;
    this.nickname = nickname;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.location = location;
    this.join_date = join_date;
    this.birth_date = birth_date;
    this.profile_avatar = profile_avatar;
  }
}
const SERVER_URL = 'https://relifecloud-nonodev96.c9users.io/';

@Injectable()
export class AuthService {
  currentUser: User;
  stringDataUser;
  access = false;

  constructor(public http: Http) {

  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(
        observer => {
          // At this point make a request to your backend to make a real check!
          let link = SERVER_URL + 'api/user/login';
          let body = JSON.stringify({email: credentials.email, password: credentials.password});
          this.http.post(link, body).subscribe(
            data => {
              let json_data = JSON.parse(data.text()).data;
              if (json_data.status == "succes") {
                this.stringDataUser = data.text();
                this.currentUser = new User(
                  json_data.id,
                  json_data.nickname,
                  json_data.first_name,
                  json_data.last_name,
                  json_data.email,
                  json_data.location,
                  json_data.join_date,
                  json_data.birth_date,
                  json_data.profile_avatar
                );
                this.access = true;
                observer.next(this.access);
                observer.complete();
              } else {
                this.access = false;
                observer.next(this.access);
                observer.complete();
              }
            },
            err => {
              console.log(err);
              this.access = false;
              observer.next(this.access);
              observer.complete();
            }
          );
        }
      );

    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(
        observer => {
          observer.next(true);
          observer.complete();
        }
      );
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public getUserInfoObservable() {
    return Observable.create(
      observer => {
        if (this.access) {
          observer.next(this.stringDataUser);
          observer.complete();
        } else {
          observer.next("Error en getUserInfoObservable");
          observer.complete();
        }
      }
    );
  }

  public updateDataUser(userObject, id) {
    return Observable.create(
      observer => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let link = SERVER_URL + 'api/user/' + id;
        let body = JSON.stringify(userObject);
        console.log(link);
        console.log(body);

        this.http.put(link, body, options).subscribe(
          response  => {
            observer.next(JSON.parse(response.text()));
            observer.complete();
          },
          error => {
            console.log("Error observer");
            observer.next(error);
            observer.complete();
          }
        );

      }
    );
  }

  public getStringDataUser(): string {
    return this.stringDataUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  logError(err) {
    console.log(err);
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }
}
