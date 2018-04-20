import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificationBarService } from '../../app/service/notificationbar.service';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage,
    public facebook: Facebook,
    public notificationBar: NotificationBarService
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LogoutPage');
  }

  logout() {
    this.storage.get('accountType').then((val) => {
      if (val == 'facebook') {
        this.facebook.logout().then(() => {
          this.storage.clear();
          this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
        }, (err)=> {
          alert(err)
        });
      } else {
        this.storage.clear();
        this.navCtrl.setRoot('WelcomePage', {}, { animate: true, direction: 'forward' });
      }
    });

    this.notificationBar.notificationbarTask('You have logged out!', 3000, 'bottom');
    
  }
}
