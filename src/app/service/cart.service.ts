import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class AddToCartService {
    public URL = 'https://ordermonkey.app/service.ordermonkey.app/userapp/general/';
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

    getCartInfo(credentials) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.URL + 'getCartInfo', JSON.stringify(credentials), { headers: header })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        })
    }

    deleteFromCart(credentials) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.URL + 'deleteFromCart', JSON.stringify(credentials), { headers: header })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        })
    }

}
