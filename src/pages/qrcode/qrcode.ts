import { Component, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Storage } from '@ionic/storage';
import { IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { LoginService } from '../../app/service/login.service';
import { NotificationBarService } from '../../app/service/notificationbar.service';
import { UserCommunication } from '../../app/service/usercom.service';



/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头
  public geoCordLong;
  public geoCordLat;
  public responseData;
  public scanResponse;
  public scanSendResponse = {
    qrcode: '',
    clientID: ''
  };
  tableSuccess;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private qrScanner: QRScanner,
    private viewCtrl: ViewController,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private toastCtrl: ToastController,
    public loginService: LoginService,
    public storage: Storage,
    public userCommunication: UserCommunication,
    public notificationBar: NotificationBarService,
    private nativePageTransitions: NativePageTransitions,
    private el: ElementRef
  ) {
    //默认为false
    this.light = false;
    this.frontCamera = false;
  }

  ionViewDidLoad() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            // this.hideCamera();
            scanSub.unsubscribe(); // stop scanning
            this.geolocation.getCurrentPosition().then((resp) => {
              this.scanResponse = text;
              const qrcode = this.scanResponse.split('/')[0];
              const clientID = this.scanResponse.split('/')[1];

              if (this.scanResponse.split('/').length != 2) {
                this.notificationBar.notificationbarTask('Table Doesn\'t Exist', 1500, 'bottom');
                this.navCtrl.pop({ animate: false });
              } else {
                this.scanSendResponse.qrcode = qrcode;
                this.scanSendResponse.clientID = clientID;
                this.geoCordLong = resp.coords.longitude;
                this.geoCordLat = resp.coords.latitude;

                this.userCommunication.userCommunicationService(this.scanSendResponse, 'welcomeScan').then((result) => {
                  this.responseData = result;
                  const geoCordReturn = this.responseData.geocord;
                  const clientLatCord = geoCordReturn.split(',')[0]; // Latitude
                  const clientLongCord = geoCordReturn.split(',')[1]; // Longitude

                  this.userCommunication.geolocationService(this.geoCordLat, this.geoCordLong, clientLatCord, clientLongCord).then((distance) => {
                    if (distance > 120) {
                      this.notificationBar.notificationbarTask('Oops! Something went wrong!', 1500, 'bottom');
                      this.navCtrl.pop({ animate: false });
                    } else {
                      if (this.responseData.tableExist) {
                        let loading = this.loadingCtrl.create({
                          content: ''
                        });
                        loading.present().then(() => {
                          this.tableSuccess = true;
                          this.storage.set('table_data', this.scanSendResponse);
                          this.navCtrl.setRoot('TabsPage', {}, { animate: true });
                          loading.dismiss();
                        });
                      } else {
                        this.notificationBar.notificationbarTask('Table Doesn\'t Exist', 1500, 'bottom');
                        this.navCtrl.pop({ animate: false });
                      }
                    }

                  });
                }, (err) => {
                  this.notificationBar.notificationbarTask(err, 1500, 'bottom');
                  //write something for error conditions
                });
              }

            }).catch((error) => {
              this.responseData = error;
              this.notificationBar.notificationbarTask(error, 1500, 'bottom');
            });
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  ionViewDidEnter() {
    //页面可见时才执行
    this.showCamera();
  }



  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  hideCamera() {
    this.qrScanner.hide();//需要关闭扫描，否则相机一直开着
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewWillLeave() {
    if (this.tableSuccess) {
      let options: NativeTransitionOptions = {
        direction: 'down',
        duration: 500,
        slowdownfactor: 3,
        slidePixels: 20,
        iosdelay: 100,
        androiddelay: 150,
        fixedPixelsTop: 0,
        fixedPixelsBottom: 60
      };
      this.nativePageTransitions.flip(options)
    }

    this.hideCamera();
    this.qrScanner.destroy();
  }
  
  ioncViewDidLeave() {
  }

}
