import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, Platform, ToastController, LoadingController } from 'ionic-angular';

import { LoginService } from '../../app/service/login.service';
import { LoadingSpinnerService } from '../../app/service/loading.service';

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
    userid: '',
    email: '',
    first_name: '',
    last_name: '',
    accessToken: ''
  };
  public token;
  public userID;

  // Our translated text strings
  public loginErrorString: string;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public loginService: LoginService,
    private storage: Storage,
    public platform: Platform,
    public facebook: Facebook,
    public loadingCtrl: LoadingController

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
    let loading = this.loadingCtrl.create({
      content: 'Please Wait... :)'
    });
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      loading.present();
      this.loginStatus = response;
      this.facebook.api('me?fields=id,email,first_name,last_name', []).then(profile => {
        this.facebookUserData.userid = profile['id'];
        this.facebookUserData.email = profile['email'];
        this.facebookUserData.first_name = profile['first_name'];
        this.facebookUserData.last_name = profile['last_name'];

        this.facebook.getLoginStatus().then(authResponse => {
          this.loginStatus = authResponse;
        });
        if (response.status === 'connected') {
          this.facebookUserData.accessToken = this.loginStatus.authResponse.accessToken;
          // TODO: store to database
          // this.loginService.facebookLoginPost().then((result)  => {

          // });
          // alert(
          //   'User ID: ' + this.facebookUserData.userid + '\n' +
          //   'Email: ' + this.facebookUserData.email + '\n' +
          //   'Fname: ' + this.facebookUserData.first_name + '\n' +
          //   'Lname: ' + this.facebookUserData.last_name + '\n'
          // );

          // alert('Token: \n' + this.facebookUserData.accessToken);

          this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
          loading.dismiss();

        } else if (response.status === 'not_authorized') {
          alert('Please Authorize Your Account to Connect with Order Monkey!');
        } else {
          alert('Failed to Use Facebook Login!');
        }

      });
    })
      .catch(e => {
        alert('Error logging into Facebook' + e)
      });
  }

  welcomeScreen() {
    this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
  }
}
