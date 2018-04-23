import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, MenuController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DeviceService } from '../../app/service/device.service';
import { LoginService } from '../../app/service/login.service';
import { NotificationBarService } from '../../app/service/notificationbar.service';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm;
  private userDevice;
  public termsIsChecked: boolean = false;
  public signupUserData: any;
  public responseData;
  public emailCheckData = {
    email: ''
  };
  public nativeUserData = {
    token: '',
    user_id: ''
  };

  // Our translated text strings
  public signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private deviceService: DeviceService,
    private iOSTaptic: TapticEngine,
    public notificationBar: NotificationBarService,
    public translateService: TranslateService,
    private loginService: LoginService,
    public http: Http,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
    this.menuCtrl.swipeEnable(false);
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.required], this.emailCheckDatabase.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl(null, [Validators.required], this.passwordIdenticalCheck.bind(this)),
      'fname': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'lname': new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  ionViewDidLoad() {
    this.deviceService.userDevice().then((val) => {
      if (val == 'iOS') {
        this.userDevice = 'ios';
      } else if (val == 'Android') {
        this.userDevice = 'android';
        alert(val)
      } else {
        this.userDevice = 'other';
      }
    });
  }

  termCheckBox(event) {
    this.termsIsChecked = event.currentTarget.checked;
    if (this.termsIsChecked) {
      this.notificationBar.notificationbarTask('Terms & Privacy Policy Agreed!', 1500, 'bottom');
    } else {
      this.notificationBar.notificationbarTask('Please Agree to Terms & Privacy Policy', 1500, 'bottom');
    }

    if (this.userDevice == 'ios') {
      this.iOSTaptic.selection();
    } else if (this.userDevice == 'android') {
      // haptic feedback for android.......
    }
  }

  passwordIdenticalCheck(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (control.value != this.signupForm.value.password) {
        resolve({ 'passwordNotMatch': true });
      } else {
        resolve(null);
      }
    });
    return promise;
  }

  emailCheckDatabase(control: FormControl): Promise<any> | Observable<any> {
    const url = 'http://ordermonkey.healthsupplementsplus.com/userapp/login/emailCheck';
    this.emailCheckData.email = control.value;
    const promise = new Promise<any>((resolve, reject) => {
      const header = new Headers();
      this.http.post(url, JSON.stringify(this.emailCheckData), { headers: header })
        .subscribe(res => {
          const result = res.json();
          const emailValid = result.emailValid;
          if (!emailValid) {
            resolve({ 'emailNotValid': true });
          } else {
            resolve(null);
          }
        });
    });
    return promise;
  }

  signup() {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present().then(()=> {
      this.signupUserData = this.signupForm.value;
      this.loginService.signupPost(this.signupUserData).then((result) => {
        this.responseData  = result;
        this.nativeUserData.token = this.responseData.token;
        this.nativeUserData.user_id = this.responseData.user_id;
        if (this.responseData.signupValid) {
          this.storage.set('accountType', 'native');
          this.storage.set('native_data', this.nativeUserData);
          this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
          loading.dismiss();
        } else {
          this.notificationBar.notificationbarTask('Something went wrong', 2000, 'bottom');
          loading.dismiss();
        }
      }, (err) => {
  
      });
    })
  }

}
