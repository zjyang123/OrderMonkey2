import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class UserCommunication {
    public URL = 'https://ordermonkey.app/service.ordermonkey.app/userapp/general/';
    constructor (
        public http: Http
    ) {}

    userCommunicationService(credentials, type) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.URL + type, JSON.stringify(credentials), { headers: header })
                .subscribe( res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        })
    }
    
    // calculating direct distance via haversine formula
    geolocationService(lat1, long1, lat2, long2) {
        return new Promise((resolve, reject) => {
            var R = 6371; // Radius of the earth in km
            var dLat = this.convertToRad(lat2-lat1);
            var dLon = this.convertToRad(long2-long1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.convertToRad(lat1)) * Math.cos(this.convertToRad(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c * 1000; // Distance in m
            resolve(d);
        });
    }

    // conversion between degrees and radians
    convertToRad(degrees) {
        const radianNumber = degrees * Math.PI / 180;
        return radianNumber;
    }
}
