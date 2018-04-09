import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class LoginService {
    public loginUrl = 'http://ordermonkey.healthsupplementsplus.com/userapp/login/';
    public authTokenCheckUrl = 'http://ordermonkey.healthsupplementsplus.com/userapp/login/authTokenCheck';
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

    authTokenCheck(tokenCheck) {
        return new Promise((resolve, reject) => {
            const headers = new Headers();
            this.http.post(this.authTokenCheckUrl, JSON.stringify(tokenCheck), { headers: headers })
                .subscribe( res => {
                    resolve(res.json());
                    console.log(tokenCheck)
                }, (err) => {
                    reject(err);
                });

        })
    }


}