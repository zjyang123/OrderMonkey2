import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderPipe } from 'ngx-order-pipe';

import { DeviceService } from '../../app/service/device.service';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { MenuControllerService } from '../../app/service/menu-controller.service';
import { OptionsNode } from '../../models/menuOptions';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

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
    public ref: ChangeDetectorRef
  ) {
    this.item = navParams.get('itemData');

  }

  ionViewWillEnter() {
    this.menuController.getMenuItemOptions(this.item).then((val) => {
      this.returnResult = val;
      this.itemOptionDetail = this.returnResult.output;
      this.hasOptions = this.returnResult.hasOptions;

      this.itemOptionDetail = this.orderPipe.transform(this.itemOptionDetail, 'order_place', false);

      this.optionListForm = new FormGroup({
        optionListArray: new FormArray([])
      })

      for (let i = 0; i < this.returnResult.output.length; i++) {
        const controlRequired = new FormControl(null, Validators.required);
        const controlNotRequired = new FormControl(null);
        if (this.returnResult.output[i].required) {
          (<FormArray>this.optionListForm.get('optionListArray')).push(controlRequired);
        } else {
          (<FormArray>this.optionListForm.get('optionListArray')).push(controlNotRequired);
        }
      }

      // const optionArrayControls = <FormArray>this.optionListForm.controls['optionListArray'];
      // this.returnResult.output.forEach(() => {
      //     optionArrayControls.push();
      //     console.log(optionArrayControls);
      // });
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

  checkBoxEvent(event, i) {
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
