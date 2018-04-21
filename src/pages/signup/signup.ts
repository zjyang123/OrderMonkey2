import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';

import { DeviceService } from '../../app/service/device.service';
import { NotificationBarService } from '../../app/service/notificationbar.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm;
  private userDevice;
  public termsIsChecked: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private deviceService: DeviceService,
    private iOSTaptic: TapticEngine,
    public notificationBar: NotificationBarService
  ) {
    this.menuCtrl.swipeEnable(false);
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      'password1': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl(null, [Validators.required])
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
    })
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

}
