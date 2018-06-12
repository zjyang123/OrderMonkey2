import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
/**
 * Generated class for the TableDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table-detail',
  templateUrl: 'table-detail.html',
})
export class TableDetailPage {
  public menu;
  currentItems: Item[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    this.menu = navParams.get('menu');
    this.currentItems = this.items.query();
  }

  itemDetails(item:any) {
    this.navCtrl.push('ItemDetailPage', {item: item})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableDetailPage');
  }

}
