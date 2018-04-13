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

@IonicPage()
@Component({
  selector: 'page-menu-list-master',
  templateUrl: 'menu-list-master.html',
})



export class MenuListMasterPage {

  menuList: String;
  menuListComponent: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menuList = this.navParams.get('menuTitle');
    this.menuListComponent = this.navParams.get('menuComponent');
    //return Observable.of(MENU_LIST.filter(menuList => menuList.pageDisplayName === menuListComponent)[0]);
    
    console.log(this.menuList);
    console.log(this.menuListComponent);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuListMasterPage');
  }

  

}
