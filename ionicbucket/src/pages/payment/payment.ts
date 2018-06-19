/**
 * @author    Ionic Bucket <ionicbucket@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   Fulcrumy
 * 
 * This file represents a component of Payment page
 * File path - '../../../../src/pages/payment/payment'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  private PaymentForm: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {
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
    this.PaymentForm = this.formBuilder.group(
      {
        cardName: ['', Validators.compose([Validators.required])],
        cardNumber: ['', Validators.compose([Validators.required])],
        expireDate: ['', Validators.compose([Validators.required])],
        cvcType: ['', Validators.compose([Validators.required])]
      }
    );
  }

}
