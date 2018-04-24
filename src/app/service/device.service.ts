import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

@Injectable()
export class DeviceService {
    constructor (
        private device: Device
    ) {}
    userDevice() {
        return new Promise((resolve, reject) => {
            resolve(this.device.platform);
        });
    }

}
