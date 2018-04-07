import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class LoginService {
    public loginUrl = 'http://healthsupplementsplus.com/ordermonkey/angularServices/admin/';
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


}