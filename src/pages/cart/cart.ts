import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AddToCartService } from '../../app/service/cart.service';
import { Storage } from '@ionic/storage';
import { CartOrderUser } from '../../models/cartOrderUser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

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
    private storage: Storage,
    public uniqueDeviceID: UniqueDeviceID
  ) {

    this.test()

    events.subscribe('cartItem:added', (addCartItem) => {
      this.cartItemArray.push(addCartItem);
    });

  }
 test() {
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
  
      console.log(this.cartOrderCredentialsInitialize)
  
    });
  }).catch((error: any) => console.log(error));

 }


  ngOnInit() {

          // if (accountType == null) {
          //   // this.cartService.getCartInfo(this.cartOrderCredentialsInitialize).then((result) => {

          //   // });
          //   console.log('User Not Logged in')
          //   console.log(this.cartOrderCredentialsInitialize);
          // } else if (accountType == 'native') {

          //   console.log('User Used Email to Log In')
          //   console.log(this.cartOrderCredentialsInitialize);
          // } else if (accountType == 'facebook') {
          //   console.log('User Used FB to Login')
          //   console.log(this.cartOrderCredentialsInitialize);
          // }


  }

  delete(itemToDelete) {
    this.cartItemArray.splice(itemToDelete, 1);
    this.events.publish('removeIndex:subtract', 1);
  }


  ionViewDidLoad() {
  }

}
