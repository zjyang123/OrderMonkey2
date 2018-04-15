import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { LoginService } from '../../app/service/login.service';
import { UserCommunication } from '../../app/service/usercom.service';

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
  public scanResponse;
  public scanSendResponse = {
    qrcode: '',
    clientID: ''
  };
  isLoggedIn: boolean = true;

  constructor(public navCtrl: NavController, 
              private barcodeScanner: BarcodeScanner,
              private geolocation: Geolocation,
              private toastCtrl: ToastController,
              public loginService: LoginService,
              public storage: Storage,
              public userCommunication: UserCommunication
  ) {
  }

  ionViewWillEnter() {
    this.storage.get('token').then((val) => {
      this.loginCheck.token = val;
      this.storage.get('user_id').then((val) => {
        this.loginCheck.user_id = val;
        this.loginService.authTokenCheck(this.loginCheck).then((result) => {
          this.responseData = result;
          this.isLoggedIn = this.responseData.loginCheck;
        }, (err) => {
          this.responseData = err;
          //write something for error conditions
        });
      });
    });  
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  barcodeScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.format == 'QR_CODE' && !barcodeData.cancelled) {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.scanResponse = barcodeData.text
          const qrcode = this.scanResponse.split('/')[0];
          const clientID = this.scanResponse.split('/')[1];
          this.scanSendResponse.qrcode = qrcode;
          this.scanSendResponse.clientID = clientID;
          // this.status = barcodeData.text;
          this.geoCordLong =  resp.coords.longitude;
          this.geoCordLat =  resp.coords.latitude;

          this.userCommunication.userCommunicationService(this.scanSendResponse, 'welcomeScan').then((result) => {
            this.responseData = result;
            const alertMSG = this.responseData.tableExist;
            let toast = this.toastCtrl.create({
              message: alertMSG,
              duration: 5000,
              position: 'bottom'
            });
            toast.present();
          }, (err) => {
            this.responseData = err;
            let toast = this.toastCtrl.create({
              message: this.responseData,
              duration: 5000,
              position: 'bottom'
            });
            //write something for error conditions
          });


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
