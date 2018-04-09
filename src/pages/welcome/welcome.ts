import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { LoginService } from '../../app/service/login.service';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public status;
  public geoCordLong;
  public geoCordLat;
  public loginCheck = {
    'user_id': '',
    'token': ''
  };
  public responseData;
  public isLoggedIn = false;

  constructor(public navCtrl: NavController, 
              private barcodeScanner: BarcodeScanner,
              private geolocation: Geolocation,
              private toastCtrl: ToastController,
              public loginService: LoginService,
              public storage: Storage
  ) {
    this.storage.get('token').then((val) => {
      this.loginCheck.token = val;
    });
    this.storage.get('user_id').then((val) => {
      this.loginCheck.user_id = val;
    });
    
    this.loginService.authTokenCheck(this.loginCheck).then((result) => {
      this.responseData = result;
      this.isLoggedIn = this.responseData.token;

      console.log(this.isLoggedIn)
    }, (err) => {
      this.responseData = err;
      //write something for error conditions
    });

    
  }


  login() {
    this.navCtrl.push('LoginPage');
  }

  barcodeScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.format == 'QR_CODE' && !barcodeData.cancelled) {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.status = barcodeData.text;
          this.geoCordLong =  resp.coords.longitude;
          this.geoCordLat =  resp.coords.latitude;
  
          const alertMSG = 'BarCode: ' + this.status + 'Long: ' + this.geoCordLong + 'Lat: ' + this.geoCordLat;
          let toast = this.toastCtrl.create({
            message: alertMSG,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

         }).catch((error) => {
           console.log('Error getting location', error);
         });
      } else {
          let toast = this.toastCtrl.create({
            message: 'Cancelled',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
      }
     }).catch(err => {
      this.status = err;
     });
  }

}
