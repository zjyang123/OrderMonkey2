import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class LoginService {
    public loginUrl = 'http://ordermonkey.healthsupplementsplus.com/userapp/login/';
    public facebookLoginUrl = 'http://ordermonkey.healthsupplementsplus.com/userapp/login/facebookLogin';
    public authTokenCheckUrl = 'http://ordermonkey.healthsupplementsplus.com/userapp/login/authTokenCheckNative';
    constructor (
        public http: Http
    ) {}

    loginPost(credentials, type) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.loginUrl + type, JSON.stringify(credentials), { headers: header })
                .subscribe( res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        })
    }

    facebookLoginPost(fb_data) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.facebookLoginUrl, JSON.stringify(fb_data), { headers: header })
                .subscribe( res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        })
    }

    authTokenCheckNative(native_data) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            this.http.post(this.authTokenCheckUrl, JSON.stringify(native_data), { headers: headers })
                .subscribe( res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        })
    }
    
    authTokenCheckFacebook(token) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            this.http.get('https://graph.facebook.com/debug_token?input_token=' + token + '&access_token=215438025885995|82099123889ef2f8b5c556aaff9070f5')
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });

        })
    }


}