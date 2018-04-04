import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, PopoverController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginModalPage } from '../login-modal/login-modal';

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
              private barcodeScanner: BarcodeScanner,
              private geolocation: Geolocation,
              private toastCtrl: ToastController,
              private modalCtrl: ModalController
  ) { }


  login() {
    this.navCtrl.push('LoginPage');
  }

  barcodeScan() {
    //this.navCtrl.push('LoginPage');
    let modal = this.modalCtrl.create(LoginModalPage);
    modal.present();

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
          
          this.navCtrl.push('LoginPage');

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
