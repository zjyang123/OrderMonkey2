import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class MenuControllerService {
    public menuCatagory = 'http://ordermonkey.healthsupplementsplus.com/userapp/general/menuInit';
    constructor (
        public http: Http
    ) {}

    getMenuCatagory(credentials) {
        return new Promise((resolve, reject) => {
            const header = new Headers();
            this.http.post(this.menuCatagory, JSON.stringify(credentials), { headers: header })
                .subscribe( res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        })
    }

}
