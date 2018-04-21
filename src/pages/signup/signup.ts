import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators} from '@angular/forms';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupForm;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password1': new FormControl(null, Validators.required),
      'password2': new FormControl(null, Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
