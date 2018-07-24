import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddToCartService } from '../../app/service/cart.service';
import { Storage } from '@ionic/storage';
import { CartOrderUser } from '../../models/cartOrderUser';

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
  public cartOrderCredentialsInitialize: CartOrderUser
  public cartItemArray = [];
  returnResult;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public cartService: AddToCartService,
    private storage: Storage
  ) {
    events.subscribe('cartItem:added', (addCartItem) => {
      this.cartItemArray.push(addCartItem);
    });

  }

  ngOnInit() {

    this.storage.get('unique_device_id').then((uuid) => {
      this.storage.get('accountType').then((accountType) => {
        if (accountType == null) {
          this.cartOrderCredentialsInitialize = {
            isLoggedIn: false,
            userID: null,
            deviceID: uuid
          };
          this.cartService.getCartInfo(this.cartOrderCredentialsInitialize).then((result) => {

          });
    
          console.log('user is not logged in, please use device id')
        } else {
          //TODO: Need to finish this so that when user is logged in, we need to check.
          console.log('user is logged in')
        }


      });
      // this.returnResult = val;
      // this.cartItemArray = this.returnResult.return_result;
    });

  }

  delete(itemToDelete) {
    this.cartItemArray.splice(itemToDelete, 1);
    this.events.publish('removeIndex:subtract', 1);
  }


  ionViewDidLoad() {
  }

}
