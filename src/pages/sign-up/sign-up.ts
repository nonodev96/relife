import { Component } from "@angular/core";
import { NavController, NavParams, Loading, LoadingController, AlertController } from "ionic-angular";
import { UsersService, InsertUser } from "../../providers/users-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../providers/auth-service";
import { ServerService } from "../../providers/server-service";
import { isNumeric } from "rxjs/util/isNumeric";

@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {

  //region ATTRIBUTES
  public insertUserFormGroup: FormGroup;
  public loading: Loading;
  public userPattern = "[a-zA-Z]\\w{4,14}";
  public passwordPattern = "^\\S*(?=\\S{8,})(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*[\\d])\\S*$";
  //endregion

  //region CONSTRUCTOR
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public usersService: UsersService,
              public authService: AuthService,
              public serverService: ServerService,
              private formBuilder: FormBuilder) {
    this.insertUserFormGroup = this.formBuilder.group(
      {
        nickname: [ "", Validators.compose([ Validators.required, Validators.pattern(this.userPattern) ]) ],
        email: [ "", Validators.compose([ Validators.required, Validators.email ]) ],
        password: [ "", Validators.compose([ Validators.required, Validators.pattern(this.passwordPattern) ]) ]
      }
    );
  }
  //endregion

  //region CONTROLLERS
  public signUp() {
    this.serverService.serviceIsAvailable().subscribe(
      allowed => {
        if (allowed) {
          this.showLoading();
          let getInsertUser = this.getInsertUser();
          this.authService.signUp(getInsertUser).subscribe(
            allowed => {
              if (allowed) {
                let response = JSON.parse(allowed.text());
                this.loading.dismiss();
                if (isNumeric(response.data.id)) {
                  let alert = this.alertCtrl.create({
                    title: "Usuario creado correctamente",
                    buttons: [ "OK" ]
                  });
                  alert.present(prompt);
                } else {
                  if (response.data.id == "") {
                    console.log(response.data.id);
                  } else {
                    if (typeof response.meta.nickname !== "undefined") {
                      this.showError(response.meta.nickname, "Nickname");
                    }
                    if (typeof response.meta.email !== "undefined") {
                      this.showError(response.meta.email, "Correo electronico");
                    }
                    if (typeof response.meta.password !== "undefined") {
                      this.showError(response.meta.password, "Contraseña");
                    }
                  }
                }
              }
            }
          );
        }
      }
    );
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
  //endregion

  //region COMPONENTS
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();
  }

  public showError(text: string, title: string = "Error") {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [ "OK" ]
    });
    alert.present(prompt);
  }

  //endregion
}
