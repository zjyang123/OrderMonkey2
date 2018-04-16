import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MENU_LIST } from '../../mocks/menu-list-mocks';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
/**
 * Generated class for the MenuListMasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { MenuListModel } from '../../models/menu-list';
import { CATEGORY_LIST } from '../../mocks/category-mocks';

@IonicPage()
@Component({
  selector: 'page-menu-list-master',
  templateUrl: 'menu-list-master.html',
})



export class MenuListMasterPage {

  menuList: String;
  menuListComponent: String;
  MENU_LIST = MENU_LIST;
  i: number;
  b: number;
  c: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menuList = this.navParams.get('menuTitle');
    this.menuListComponent = this.navParams.get('menuComponent');
    this.i = 0;
    

    while (MENU_LIST[this.i].componentName != this.menuListComponent){
      this.i++;
    }
    // This logs out the name just in case if it is wrong
    // console.log(MENU_LIST[this.i].componentName);
    
    this.b = 0;
    this.c = 0;
    console.log(MENU_LIST[this.i].componentid[1]);
    console.log(CATEGORY_LIST[this.i].componentid);
    while (this.c<6) {
      if (MENU_LIST[this.i].componentid[this.c] === CATEGORY_LIST[this.c].componentid) {
        console.log(CATEGORY_LIST[this.c].componentid);
      }


      this.c++;
      console.log(this.c);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuListMasterPage');



  }
}
