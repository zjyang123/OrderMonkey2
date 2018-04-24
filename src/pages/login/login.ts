import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform, LoadingController, MenuController } from 'ionic-angular';

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
    user_id: '',
    email: '',
    first_name: '',
    last_name: '',
    token: ''
  };
  public nativeUserData = {
    token: '',
    user_id: ''
  };
  public token;
  public userID;

  public loginStatus;
  // Our translated text strings
  public loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public translateService: TranslateService,
    public loginService: LoginService,
    private storage: Storage,
    public platform: Platform,
    public facebook: Facebook,
    public loadingCtrl: LoadingController

  ) {
    this.menuCtrl.swipeEnable(false);

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
      this.nativeUserData.token = this.token;
      this.nativeUserData.user_id = this.userID;
      if (this.userData != false) {
        this.storage.set('accountType', 'native');
        this.storage.set('native_data', this.nativeUserData);
        this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
      }
    }, (err) => {
      this.responseData = err;
      //write something for error conditions
    });
  }

  fbLogin() {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present().then(()=> {
      this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
        this.loginStatus = response;
        this.facebook.api('me?fields=id,email,first_name,last_name', []).then(profile => {
          this.facebookUserData.user_id = profile['id'];
          this.facebookUserData.email = profile['email'];
          this.facebookUserData.first_name = profile['first_name'];
          this.facebookUserData.last_name = profile['last_name'];
  
          this.facebook.getLoginStatus().then(authResponse => {
            this.loginStatus = authResponse;
          });
          if (response.status === 'connected') {
            this.facebookUserData.token = this.loginStatus.authResponse.accessToken;
            this.storage.set('accountType', 'facebook');
            this.storage.set('fb_data', this.facebookUserData);
            this.storage.set('fb_token', this.facebookUserData.token);
            
            this.loginService.facebookLoginPost(this.facebookUserData);
            
            this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
            loading.dismiss();
          } else if (response.status === 'not_authorized') {
            alert('Please Authorize Your Account to Connect with Order Monkey!');
            loading.dismiss();
          } else {
            alert('Failed to Use Facebook Login!');
            loading.dismiss();
          }
        });
      }).catch(e => {
        loading.dismiss();
        alert('Error logging into Facebook' + e)
      });

    })
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
