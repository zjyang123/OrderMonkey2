import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class AddToCartService {
    public URL = 'http://ordermonkey.healthsupplementsplus.com/userapp/general/';
    constructor(
        public http: Http
    ) { }

    addToCart(itemInfo) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.URL + 'addToCart', JSON.stringify(itemInfo), { headers: header })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        })
    }

}
