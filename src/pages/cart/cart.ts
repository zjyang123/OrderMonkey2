import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddToCartService } from '../../app/service/cart.service';
import { Storage } from '@ionic/storage';
import { CartOrderUser } from '../../models/cartOrderUser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { NotificationBarService } from '../../app/service/notificationbar.service';

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
  deleteResult;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public cartService: AddToCartService,
    private storage: Storage,
    public uniqueDeviceID: UniqueDeviceID,
    public notificationBar: NotificationBarService
  ) {
    this.cartInitialize();
    events.subscribe('cartItem:added', (addCartItem) => {
      this.cartItemArray.push(addCartItem);
    });
  }

  cartInitialize() {
    this.cartOrderCredentialsInitialize = {
      clientID: null,
      isLoggedIn: false,
      userID: null,
      deviceID: null
    };
    this.uniqueDeviceID.get().then((uuid: any) => {
      Promise.all([this.storage.get('accountType'), this.storage.get('table_data')]).then(values => {
        const accountType = values[0];
        const clientID = values[1].clientID;
        this.cartOrderCredentialsInitialize.deviceID = uuid;
        this.cartOrderCredentialsInitialize.clientID = clientID;

        if (accountType == null) {
          this.cartService.getCartInfo(this.cartOrderCredentialsInitialize).then((result) => {
            this.returnResult = result;
            this.cartItemArray = this.returnResult.output;
            const cartItemlength = this.cartItemArray.length;
            this.events.publish('initialCartCount', cartItemlength);
          });
        } else if (accountType == 'native') {
          this.storage.get('native_data').then((nativeData) => {
            this.cartOrderCredentialsInitialize.userID = nativeData.user_id;            
            this.cartService.getCartInfo(this.cartOrderCredentialsInitialize).then((result) => {
              this.returnResult = result;
              this.cartItemArray = this.returnResult.output;
              const cartItemlength = this.cartItemArray.length;
              this.events.publish('initialCartCount', cartItemlength);
            });
          });
        } else if (accountType == 'facebook') {
          this.storage.get('fb_data').then((fbData) => {
            this.cartOrderCredentialsInitialize.userID = fbData.user_id;
            this.cartService.getCartInfo(this.cartOrderCredentialsInitialize).then((result) => {
              this.returnResult = result;
              this.cartItemArray = this.returnResult.output;
              const cartItemlength = this.cartItemArray.length;
              this.events.publish('initialCartCount', cartItemlength);
            });
          });
        }
      });
    }).catch((error: any) => console.log(error));

  }

  ngOnInit() {
  }

  delete(itemToDelete) {
    this.cartService.deleteFromCart(this.cartItemArray[itemToDelete]).then((val) => {
      this.deleteResult = val;
      if (this.deleteResult.isDeleted) {
        // make sure all string english text get put in translate function for spanish later on
        const message = this.cartItemArray[itemToDelete].itemName + ' has been deleted from your cart!';
        this.notificationBar.notificationbarTask(message, 2000, 'bottom');
      } else {

      }
    });
    this.cartItemArray.splice(itemToDelete, 1);
    this.events.publish('removeIndex:subtract', 1);
  }

}
