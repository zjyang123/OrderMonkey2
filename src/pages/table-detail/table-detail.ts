import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menu = navParams.get('menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableDetailPage');
  }

}
