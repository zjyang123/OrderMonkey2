import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { IonicPage, MenuController, NavController, ToastController, LoadingController } from 'ionic-angular';

import { LoginService } from '../../app/service/login.service';
import { NotificationBarService } from '../../app/service/notificationbar.service';
import { UserCommunication } from '../../app/service/usercom.service';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  public status;
  public geoCordLong;
  public geoCordLat;
  public responseData;
  public scanResponse;
  public scanSendResponse = {
    qrcode: '',
    clientID: ''
  };
  isLoggedIn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private barcodeScanner: BarcodeScanner,
    private geolocation: Geolocation,
    private toastCtrl: ToastController,
    public loginService: LoginService,
    public storage: Storage,
    public userCommunication: UserCommunication,
    public notificationBar: NotificationBarService,
    public loadingCtrl: LoadingController
  ) {
    this.menuCtrl.swipeEnable(false);
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present().then(() => {
      this.getLoginStatus();
      loading.dismiss();
    })
  }

  getLoginStatus() {
    this.storage.get('accountType').then((val) => {
      if (val == 'facebook') {
        this.storage.get('fb_token').then((val) => {
          this.loginService.authTokenCheckFacebook(val).then((result) => {
            this.responseData = result;
            this.isLoggedIn = this.responseData.data.is_valid;
            if (this.isLoggedIn) {
              this.menuCtrl.swipeEnable(true);
            }
          }, (err) => {
            alert(err)
            //write something for error conditions
          });
        });
      } else {
        this.storage.get('native_data').then((val) => {
          this.loginService.authTokenCheckNative(val).then((result) => {
            this.responseData = result;
            this.isLoggedIn = this.responseData.loginCheck;
            if (this.isLoggedIn) {
              this.menuCtrl.swipeEnable(true);
            }
          }, (err) => {
            alert(err)
            //write something for error conditions
          });
        });

      }

    });

  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  test() {
    this.geoCordLat = 50.885800// test cords
    this.geoCordLong = -114.089385// test cords
    this.scanSendResponse.qrcode = '87AE33DA4057BE65F2C450913663D261B0A442085BC4F2995AEB6BD4EF510C4A';
    this.scanSendResponse.clientID = '1';

    this.userCommunication.userCommunicationService(this.scanSendResponse, 'welcomeScan').then((result) => {
      this.responseData = result;
      const geoCordReturn = this.responseData.geocord;
      const clientLatCord = geoCordReturn.split(',')[0]; // Latitude
      const clientLongCord = geoCordReturn.split(',')[1]; // Longitude

      this.userCommunication.geolocationService(this.geoCordLat, this.geoCordLong, clientLatCord, clientLongCord).then((distance) => {

        if (distance > 4000) {
          const alertMSG = 'Distance: ' + distance + 'm...' + 'table exist: ' + this.responseData.tableExist + '...Is active?: ' + this.responseData.tableActive;
          this.notificationBar.notificationbarTask(alertMSG, 3000, 'bottom');

        } else {
          if (this.responseData.tableExist) {
            this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
          } else {
            let toast = this.toastCtrl.create({
              message: 'Table Doesnt Exist',
              duration: 5000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      });
    }, (err) => {
      this.responseData = err;
      //write something for error conditions
    });
  }

  barcodeScan() {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present().then(()=> {
      this.barcodeScanner.scan().then(barcodeData => {
        if (barcodeData.format == 'QR_CODE' && !barcodeData.cancelled) {
          this.geolocation.getCurrentPosition().then((resp) => {
            this.scanResponse = barcodeData.text
            const qrcode = this.scanResponse.split('/')[0];
            const clientID = this.scanResponse.split('/')[1];
            this.scanSendResponse.qrcode = qrcode;
            this.scanSendResponse.clientID = clientID;
            this.geoCordLong = resp.coords.longitude;
            this.geoCordLat = resp.coords.latitude;
  
            // this.geoCordLat = 50.900444// test cords
            // this.geoCordLong = -114.085056// test cords
  
            const testLat = 50.885800// test cords
            const testLong = -114.089385// test cords
  
            this.userCommunication.userCommunicationService(this.scanSendResponse, 'welcomeScan').then((result) => {
              this.responseData = result;
              const geoCordReturn = this.responseData.geocord;
              const clientLatCord = geoCordReturn.split(',')[0]; // Latitude
              const clientLongCord = geoCordReturn.split(',')[1]; // Longitude
  
              this.userCommunication.geolocationService(this.geoCordLat, this.geoCordLong, clientLatCord, clientLongCord).then((distance) => {
                if (distance > 120) {
                  this.notificationBar.notificationbarTask('Oops! Something went wrong!', 1500, 'bottom');
                } else {
                  if (this.responseData.tableExist) {
                    this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' });
                  } else {
                    this.notificationBar.notificationbarTask('Table Doesn\'t Exist', 1500, 'bottom');
                  }
                }
              });
            }, (err) => {
              this.notificationBar.notificationbarTask(err, 1500, 'bottom');
              //write something for error conditions
            });
  
          }).catch((error) => {
            this.responseData = error;
            this.notificationBar.notificationbarTask(error, 1500, 'bottom');
          });
        } else {
          this.notificationBar.notificationbarTask('Cancelled', 1500, 'bottom');
        }
        loading.dismiss();
      }).catch(err => {
        loading.dismiss();
        this.responseData = err;
        this.notificationBar.notificationbarTask(err, 1500, 'bottom');
      });
    });
  }
}
