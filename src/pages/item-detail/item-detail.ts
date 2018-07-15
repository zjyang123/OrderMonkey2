import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderPipe } from 'ngx-order-pipe';

import { DeviceService } from '../../app/service/device.service';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { MenuControllerService } from '../../app/service/menu-controller.service';
import { OptionsNode } from '../../models/menuOptions';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    private iOSTaptic: TapticEngine,
    public menuController: MenuControllerService,
    private orderPipe: OrderPipe,
    public ref: ChangeDetectorRef,
    public fb: FormBuilder
  ) {
    this.item = navParams.get('itemData');
  }

  ngOnInit() {
    this.menuController.getMenuItemOptions(this.item).then((val) => {
      this.returnResult = val;
      this.itemOptionDetail = this.returnResult.output;
      this.hasOptions = this.returnResult.hasOptions;

      this.itemOptionDetail = this.orderPipe.transform(this.itemOptionDetail, 'order_place', false);

      if (this.hasOptions) {
        this.createForm(this.itemOptionDetail);
        if (this.optionListForm.valid) {
          // check first initialized form if its valid, we allow cart button to be pressed
          this.footerAddToCartButton = true;
        }
      }
      // if (this.hasOptions) {
      // this.itemOptionGeneralGrouped = this.groupBy(this.itemOptionGeneral, key => key.option_group_name);

      //   this.hasCheckbox = grouped.get('checkbox');
      //   this.hasSelect = grouped.get('select');
      //   console.log(this.optionList)
      //   console.log(grouped)
      //   console.log(this.hasCheckbox);
      //   console.log(this.hasSelect);
      // }
    });

  }

  public createForm(data) {
    var arr = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].option_type == 'checkbox') {
        for (let j = 0; j < data[i].option_list.length; j++) {
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
        alert(val)
      } else {
        this.userDevice = 'other';
      }
    });

  }

  checkBoxEvent(event) {
    if (this.optionListForm.valid) {
      // update add to cart button status
      this.footerAddToCartButton = true;
    }
    if (this.userDevice == 'ios') {
      this.iOSTaptic.impact({ style: 'medium' });
      this.iOSTaptic.selection();
    } else if (this.userDevice == 'android') {
      // haptic feedback for android.......
    }
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

  close() {
    this.navCtrl.pop();
  }
}
