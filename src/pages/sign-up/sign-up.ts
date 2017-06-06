import { Component } from '@angular/core';
import { NavController, NavParams, Loading } from 'ionic-angular';
import { UsersService, InsertUser } from "../../providers/users-service";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
	selector: 'page-sign-up',
	templateUrl: 'sign-up.html',
})
export class SignUpPage {

	public insertUserFormGroup: FormGroup;
	public loading: Loading;
	public userPattern = "[a-zA-Z]\\w{4,14}";
	public passwordPattern = "^\\S*(?=\\S{8,})(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*[\\d])\\S*$";
  public password = new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])); 
	
	constructor(public navCtrl: NavController, 
							public navParams: NavParams,
							public usersService: UsersService,
              private formBuilder: FormBuilder) {
		this.insertUserFormGroup = this.formBuilder.group(
      {
        nickname: [ '', Validators.compose([Validators.required, Validators.pattern(this.userPattern)]) ],
        email: [ '', Validators.compose([Validators.required, Validators.email]) ],
        password: this.password,
        repeat_password: [ '', [ this.passwordMatch.bind(this) ] ]
      }
    );
	}

	passwordMatch(tha) {
		console.log(tha);
		return (tha.value == this.password.value) ? true : {'passwordMatch': {valid: true}};
	}	

	public signUp() {
    let insertUser = this.getInsertUser();
    console.log(insertUser);
	}

	public getInsertUser(): InsertUser {
    let nickname = this.insertUserFormGroup.value.nickname;
    let email = this.insertUserFormGroup.value.email;
    let password = this.insertUserFormGroup.value.password;
    let insertUserObject = {
      nickname: nickname,
      email: email,
      password: password
    };
    return new InsertUser(insertUserObject);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignUpPage');
	}

}
