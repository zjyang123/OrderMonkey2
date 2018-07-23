import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddToCartService } from '../../app/service/cart.service';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public cartItemArray = [];
  returnResult;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public cartService: AddToCartService
  ) {
    events.subscribe('cartItem:added', (addCartItem) => {
      this.cartItemArray.push(addCartItem);
    });

  }

  ngOnInit() {
    this.cartService.getCartInfo().then((val) => {
      this.returnResult = val;
      this.cartItemArray = this.returnResult.return_result;
    });
  }

  delete(itemToDelete) {
    this.cartItemArray.splice(itemToDelete, 1);
    this.events.publish('removeIndex:subtract', 1);
  }

  ionViewDidLoad() {
  }

}
