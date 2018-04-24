import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})


export class AccountPage {

  person: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person='David';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
