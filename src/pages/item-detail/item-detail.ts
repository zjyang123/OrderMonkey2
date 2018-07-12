import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderPipe } from 'ngx-order-pipe';

import { DeviceService } from '../../app/service/device.service';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { MenuControllerService } from '../../app/service/menu-controller.service';
import { OptionsNode } from '../../models/menuOptions';

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

  selectOptionItem: string = '';

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public deviceService: DeviceService,
    private iOSTaptic: TapticEngine,
    public menuController: MenuControllerService,
    private orderPipe: OrderPipe
  ) {
    this.item = navParams.get('item');
  }

  ionViewWillEnter() {
    this.menuController.getMenuItemOptions(this.item).then((val) => {
      this.returnResult = val;
      this.itemOptionDetail = this.returnResult.output;
      this.hasOptions = this.returnResult.hasOptions;

      this.itemOptionDetail = this.orderPipe.transform(this.itemOptionDetail, 'option_type', true);
      console.log(this.itemOptionDetail)
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

  close() {
    this.navCtrl.pop();
  }
}
