import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform, ToastController } from 'ionic-angular';

import { LoginService } from '../../app/service/login.service';

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
  public userData;
  public facebookUserData = {
    id: '',
    email: '', 
    first_name: '', 
    picture: '', 
    username: ''
  };
  public token;
  public userID;

  // Our translated text strings
  public loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loginService: LoginService,
    private storage: Storage,
    public platform: Platform,
    public facebook: Facebook
  
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

  }

  login() {
    this.type = 'login';
    this.credentials.username = this.loginForm.value.username;
    this.credentials.password = this.loginForm.value.password;

    this.loginService.loginPost(this.credentials, this.type).then((result) => {
      this.responseData = result;
      this.userData = this.responseData.userData;
      this.token = this.responseData.token;
      this.userID = this.responseData.user_id;

      this.storage.set('token', this.token);
      this.storage.set('user_id', this.userID);

      if (this.userData != false) {
        this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
      } else {
        // console.log(this.responseData.test)
      }
    }, (err) => {
      this.responseData = err;
      //write something for error conditions
    });
  }


  public loginStatus;
  fbLogin() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.facebookUserData = {
          id: profile['id'],
          email: profile['email'], 
          first_name: profile['first_name'], 
          picture: profile['picture_large']['data']['url'], 
          username: profile['name']
        }

        this.loginStatus = response;

      });
    });
  }

  welcomeScreen() {
    this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
  }
}
