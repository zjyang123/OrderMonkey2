/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of User Information page
 * File path - '../../../../src/pages/user-information/user-information'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-user-information',
  templateUrl: 'user-information.html',
})
export class UserInformationPage {

  private UserInfoForm: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private menu: MenuController) {
    this.menu.enable(true); // Enable sidemenu
  }

  /**
   * Do any initialization
   */
  ngOnInit() {
    this.formValidation();
  }

  /***
   * --------------------------------------------------------------
   * Form Validation
   * --------------------------------------------------------------
   * @method   formValidation
   */
  formValidation() {
    this.UserInfoForm = this.formBuilder.group(
      {
        fullname: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        mobile: ['', Validators.compose([Validators.required])],
        time: ['', Validators.compose([Validators.required])],
        date: ['', Validators.compose([Validators.required])],
        locationAddress: ['', Validators.compose([Validators.required])],
      }
    );
  }

  /**
   * --------------------------------------------------------------
   * Go To Menu Category Page
   * --------------------------------------------------------------
   */
  gotoMenuCategoryPage() {
    this.navCtrl.setRoot('FoodCategoriesPage');
  }
}
