import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';

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
  constructor(public navCtrl: NavController, 
              private qrScanner: QRScanner,
              private barcodeScanner: BarcodeScanner,
              private geolocation: Geolocation,
              private toastCtrl: ToastController
  ) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  scanQR() {
    // this.navCtrl.push('SignupPage');
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.status = "authorized";
          // camera permission was granted

          
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
          
          // show camera preview
          this.qrScanner.show();
          
          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          this.status = "denied perma";
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          this.status = "denied temp";
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => {
        console.log('Error is', e);
        this.status = e;
      });
  }

  barcodeScan() {
    this.barcodeScanner.scan().then(barcodeData => {
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
     }).catch(err => {
      this.status = err;
     });
  }

}
