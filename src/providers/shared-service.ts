import { EventEmitter, Injectable, Output } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from "./auth-service";

/*
 Generated class for the SharedService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SharedService {

  //region ATTRIBUTES
  @Output() _userEvent: EventEmitter<any> = new EventEmitter();
  //endregion

  //region CONSTRUCTOR
  constructor() {
    console.log('shared service started');
  }

  //endregion

  //region GETTER AND SETTER
  setEmitterUser(_user) {
    console.log('setEmitterUser started');
    console.log(_user);
    this._userEvent.emit(_user);
  }

  getEmittedUser() {
    return this._userEvent;
  }

  //endregion
}
