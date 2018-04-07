import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { LoginService } from '../../app/service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public type;
  public credentials = {
    'username': '',
    'password': ''
  };
  loginForm: FormGroup;

  public responseData;

  // Our translated text strings
  public loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loginService: LoginService
  
  ) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

  }

  // Attempt to login in through our User service
  // doLogin() {
  //   this.user.login(this.account).subscribe((resp) => {
  //     this.navCtrl.push(MainPage);
  //   }, (err) => {
  //     this.navCtrl.push(MainPage);
  //     // Unable to log in
  //     let toast = this.toastCtrl.create({
  //       message: this.loginErrorString,
  //       duration: 3000,
  //       position: 'top'
  //     });
  //     toast.present();
  //   });
  // }
  public testReturn;
  login() {
    this.type = 'loginService';
    this.loginService.loginPost(this.credentials, this.type).then((result) => {
      this.responseData = result;
      this.testReturn = this.responseData.msg;

    }, (err) => {
      this.responseData = err;
      //write something for error conditions
    });
  }
}
