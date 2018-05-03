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

  itemDetailArray = [
    {
      itemID: 1,
      itemName: 'Eggs',
      itemURL: 'https://smittenkitchendotcom.files.wordpress.com/2014/10/the-crispy-egg1.jpg',
      itemDesc: 'Protein rich delicious snack',
      menuID: 1,
      options : ['boiled', 'poached', 'fried' ]
    },
    {
      itemID: 2,
      itemName: 'Muffins',
      itemDesc: 'Fibre for poopies',
      itemURL: 'https://www.craftycookingmama.com/wp-content/uploads/2016/03/040.jpg',
      menuID: 2,
      options : ['Chocolate', 'Vanilla', 'Bandana Bred' ]
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menu = navParams.get('menu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableDetailPage');
  }

}
