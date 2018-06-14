import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public items: Items,
    public modalCtrl: ModalController
  ) {
    this.menu = navParams.get('menu');
    this.currentItems = this.items.query();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableDetailPage');
  }

  itemDetails(item:any) {
    let profileModal = this.modalCtrl.create('ItemDetailPage', {item: item});
    profileModal.present();
  }

}
