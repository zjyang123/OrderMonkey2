import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NotificationBarService {

    constructor(private toastCtrl: ToastController) {

    }

    notificationbarTask(msg, duration, position) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: duration,
            position: position,
            cssClass: "toastStyle"
          });
          toast.present();
    }


}