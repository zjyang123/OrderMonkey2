import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { OrderPipe } from 'ngx-order-pipe';

import { DeviceService } from '../../app/service/device.service';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { MenuControllerService } from '../../app/service/menu-controller.service';
import { OptionsNode } from '../../models/menuOptions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddToCartService } from '../../app/service/cart.service';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})

export class ItemDetailPage {
  item: any;
  userDevice: any;
  itemOptionDetail: OptionsNode;
  returnResult: any;
  hasOptions: any;
  optionType: any;
  hasCheckbox: any;
  hasSelect: any;
  optionListForm: FormGroup;
  footerAddToCartButton = false;
  objectName: any;
  itemPriceGlobal: any;
  loadingWait = false;
  itemOptionList = []; // THE GRAND MAMA OPTION LIST TO SEARCH FROM
  selectedItemOptionList = [];

  //*********** Variables for fading header **************//
  showToolbar: boolean = false;
  transition: boolean = false;
  headerImgSize: string = '100%';
  headerImgUrl: string = '';
  //****************************//

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public deviceService: DeviceService,
    public menuController: MenuControllerService,
    public addToCartService: AddToCartService,
    private iOSTaptic: TapticEngine,
    private orderPipe: OrderPipe,
    public ref: ChangeDetectorRef,
    public fb: FormBuilder,
    public events: Events
  ) {
    this.item = navParams.get('itemData');
  }

  ngOnInit() {
    this.menuController.getMenuItemOptions(this.item).then((val) => {
      this.returnResult = val;
      this.itemOptionDetail = this.returnResult.output;
      this.hasOptions = this.returnResult.hasOptions;

      this.itemOptionDetail = this.orderPipe.transform(this.itemOptionDetail, 'order_place', false);

      // set a viewable item price
      this.itemPriceGlobal = Number(this.item.price);

      if (this.hasOptions) {
        this.createForm(this.itemOptionDetail);
        // list out all associated item options to be searchable later
        for (let i = 0; i < this.returnResult.output.length; i++) {
          const tempLength = this.returnResult.output[i].option_list.length;
          for (let j = 0; j < tempLength; j++) {
            this.itemOptionList.push(this.returnResult.output[i].option_list[j])
          }
        }
        if (this.optionListForm.valid) {
          // check first initialized form if its valid, we allow cart button to be pressed
          this.footerAddToCartButton = true;
        }
        this.checkBoxEvent();
      } else {
        this.footerAddToCartButton = true;
      }

      // if (this.hasOptions) {
      // this.itemOptionGeneralGrouped = this.groupBy(this.itemOptionGeneral, key => key.option_group_name);

      //   this.hasCheckbox = grouped.get('checkbox');
      //   this.hasSelect = grouped.get('select');
      // }
    });

  }

  createForm(data) {
    var arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].option_type == 'checkbox') {
        for (let j = 0; j < data[i].option_list.length; j++) {
          // passes current option list item , general option data and option list item index
          arr.push(this.buildOptionCheckbox(data[i].option_list[j], data[i]));
        }
      } else {
        arr.push(this.buildOptionSelect(data[i]));
      }
    }
    this.optionListForm = this.fb.group({
      optionSelect: this.fb.array(arr)
    })
  }

  buildOptionCheckbox(data, generalData) {
    // looping for checkbox options under general table -> list option table coming from data base
    if (generalData.required) {
      return this.fb.group({
        isSelected: ['', Validators.required],
        tag: [data.options_name],
        tag_id: [data.id],
        type: [generalData.option_type]
      })
    } else {
      return this.fb.group({
        isSelected: [''],
        tag: [data.options_name],
        tag_id: [data.id],
        type: [generalData.option_type]
      })
    }

  }

  buildOptionSelect(data) {
    // looping for select boxes coming from data base
    if (data.required) {
      return this.fb.group({
        isSelected: ['', Validators.required],
        tag: [data.option_group_name],
        tag_id: [data.id],
        type: [data.option_type]
      })
    } else {
      return this.fb.group({
        isSelected: [''],
        tag: [data.option_group_name],
        tag_id: [data.id],
        type: [data.option_type]
      })
    }
  }

  ionViewDidLoad() {
    this.deviceService.userDevice().then((val) => {
      if (val == 'iOS') {
        this.userDevice = 'ios';
      } else if (val == 'Android') {
        this.userDevice = 'android';
      } else {
        this.userDevice = 'other';
      }
    });

  }

  checkBoxEvent() {
    if (this.optionListForm.valid) {
      // update add to cart button status
      this.footerAddToCartButton = true;
    }

    this.optionListForm.valueChanges.subscribe(val => {
      if (this.userDevice == 'ios') {
        this.iOSTaptic.impact({ style: 'medium' });
        this.iOSTaptic.selection();
      } else if (this.userDevice == 'android') {
        // haptic feedback for android.......
      }

      this.itemPriceGlobal = Number(this.item.price);
      this.selectedItemOptionList = [];
      const optionSelected = val.optionSelect;
      for (let i = 0; i < optionSelected.length; i++) {
        if (optionSelected[i].type == 'select' && optionSelected[i].isSelected != '') {
          for (let j = 0; j < optionSelected[i].isSelected.length; j++) {
            this.selectedItemOptionList.push(optionSelected[i].isSelected[j]);
          }
        } else if (optionSelected[i].type == 'checkbox' && optionSelected[i].isSelected == true) {
          this.selectedItemOptionList.push(optionSelected[i].tag_id);
        }
      }

      for (let i = 0; i < this.selectedItemOptionList.length; i++) {
        for (let j = 0; j < this.itemOptionList.length; j++) {
          if (this.itemOptionList[j]['id'] == this.selectedItemOptionList[i]) {
            this.itemPriceGlobal += Number(this.itemOptionList[j].option_price);
          }
        }
      }
    })

  }

  // groupBy(list, keyGetter) {
  //   const map = new Map();
  //   list.forEach((item) => {
  //       const key = keyGetter(item);
  //       const collection = map.get(key);
  //       if (!collection) {
  //           map.set(key, [item]);
  //       } else {
  //           collection.push(item);
  //       }
  //   });
  //   return map;
  // }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 100;
    if (scrollTop < 0) {
      this.transition = false;
      this.headerImgSize = `${Math.abs(scrollTop) / 2 + 100}%`;
    } else {
      this.transition = true;
      this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
  }

  addToCart() {
    this.loadingWait = true;
    this.footerAddToCartButton = false;
    const optionArray = [];
    if (this.hasOptions) {
      for (let i = 0; i < this.optionListForm.value.optionSelect.length; i++) {
        if (this.optionListForm.value.optionSelect[i]['isSelected'] != '' && this.optionListForm.value.optionSelect[i]['type'] == 'select') {
          const selectArrayLength = this.optionListForm.value.optionSelect[i]['isSelected'].length;
          if (selectArrayLength > 0) {
            for (let j = 0; j < selectArrayLength; j++) {
              optionArray.push(
                this.optionListForm.value.optionSelect[i]['isSelected'][j]
              );
            }
          } else {
            optionArray.push(
              this.optionListForm.value.optionSelect[i]['isSelected']
            );
          }
        } else if (this.optionListForm.value.optionSelect[i]['isSelected'] == true && this.optionListForm.value.optionSelect[i]['type'] == 'checkbox') {
          optionArray.push(
            this.optionListForm.value.optionSelect[i]['tag_id']
          );
        }

      }
    }

    const addCartItem = {
      itemID: this.item.id,
      itemPrice: this.itemPriceGlobal,
      itemName: this.item.product_name,
      itemImage: this.item.product_image,
      optionItemID: optionArray
    }

    this.addToCartService.addToCart(addCartItem).then((val) => {
      console.log(val)

        this.loadingWait = false;
        this.events.publish('cartItem:added', addCartItem);
        this.navCtrl.pop();
        
    }, (err) => {
      // do something if error happens
    });
    // TODO: push addCartItem variable to cartService and subscribe to it from Tabs page 

    // console.log(addCartItem)
  }

  close() {
    this.navCtrl.pop();
  }
}
