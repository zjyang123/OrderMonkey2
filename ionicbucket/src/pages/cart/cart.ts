/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Cart page
 * File path - '../../../../src/pages/cart/cart'
 */


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private menu: MenuController) {
    this.menu.enable(true);
  }

  gotoDeliveryConfirmPage() {
    this.navCtrl.setRoot('DeliveryConfirmationPage');
  }
}
