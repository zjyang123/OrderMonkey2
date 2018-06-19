/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Food Category Item page
 * File path - '../../../../src/pages/food-category-items/food-category-items'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-food-category-items',
  templateUrl: 'food-category-items.html',
})
export class FoodCategoryItemsPage {

  categoryName: any;
  foodItems: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private http: HttpClient,
    public modalCtrl: ModalController) {

  }

  /***
   * --------------------------------------------------------------
   * Lifecycle Event - ionViewDidLoad()
   * --------------------------------------------------------------
   * 
   * Fired when the page has loaded
   */
  ionViewDidLoad() {
    this.getNavParamsData();
    this.getFoodItems();
  }

  /**
   * --------------------------------------------------------------
   * Get & Set data from NavParams
   * --------------------------------------------------------------
   */
  async getNavParamsData() {
    if (this.navParams.get('category')) {
      this.categoryName = this.navParams.get('category');
    }
  }

  /**
   * --------------------------------------------------------------
   * Get All Food Items
   * --------------------------------------------------------------
   */
  getFoodItems() {
    this.http.get('assets/i18n/en.json').subscribe((data: any) => {
      this.foodItems = data.FOOD_ITEMS[this.categoryName];
    }, error => {
      console.error('Error: ' + error);
    });
  }

  // Remove quantity
  minusQuantity(item, index) {
    if (this.foodItems[index].quantity > 0) {
      this.foodItems[index].quantity = this.foodItems[index].quantity - 1;
    }
  }

  // Add quantity
  addQuantity(item, index) {
    if (this.foodItems[index].quantity) {
      this.foodItems[index].quantity = this.foodItems[index].quantity + 1;
    } else {
      this.foodItems[index].quantity = 0;
      this.foodItems[index].quantity = this.foodItems[index].quantity + 1;
    }
  }

  /**
   * --------------------------------------------------------------
   * GoTO Item Details Page
   * --------------------------------------------------------------
   */
  gotoItemDetails() {
    this.navCtrl.setRoot('FoodItemDetailsPage');
  }
  /**
   * Dismiss function
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
