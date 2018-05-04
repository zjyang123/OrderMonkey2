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
      id: 1,
      client_menu_id: 1,
      client_id: 1,
      product_name: 'Eggs',
      product_image: 'https://smittenkitchendotcom.files.wordpress.com/2014/10/the-crispy-egg1.jpg',
      product_description: 'Protein rich delicious snack with not muffins but bluffings lmaoe',
      has_options: ['boiled', 'poached', 'fried' ]
    },
    {

      id: 2,
      client_menu_id: 1,
      client_id: 1,
      product_name: 'Muffins',
      product_image: 'https://www.craftycookingmama.com/wp-content/uploads/2016/03/040.jpg',
      product_description: 'Fibre for poopies, also for groups and anyone else that might want to join you, for example, pineapples, or slothes',
      has_options: ['Chocolate', 'Vanilla', 'Bandana Bred' ]
    },
    {

      id: 2,
      client_menu_id: 1,
      client_id: 1,
      product_name: 'Cookies',
      product_image: 'https://images-gmi-pmc.edge-generalmills.com/e8198dd2-770b-4c7c-a748-ca7538cf48d0.jpg',
      product_description: 'Fibre for poopies, also for groups and anyone else that might want to join you, for example, pineapples, or slothes',
      has_options: []
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.menu = navParams.get('menu');
  }

  itemDetails(item:any) {
    this.navCtrl.push('ItemDetailPage', {item: item})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TableDetailPage');
  }

}
