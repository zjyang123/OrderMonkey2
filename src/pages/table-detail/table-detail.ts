import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { MenuControllerService } from '../../app/service/menu-controller.service';
import { NotificationBarService } from '../../app/service/notificationbar.service';
import { MenuItemsArray } from '../../models/menuItemsArray';

@IonicPage()
@Component({
  selector: 'page-table-detail',
  templateUrl: 'table-detail.html',
})
export class TableDetailPage {
  public menu;
  public subMenuResult;
  public menuNotEmpty = true;
  public getMenuDetail: MenuItemsArray;
  public subMenuItems;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public menuService: MenuControllerService, // This is for food menu controller service
    public loadingCtrl: LoadingController,
    public notificationBar: NotificationBarService

  ) {
    this.menu = navParams.get('menu');
    this.getMenuDetail = {
      clientID: this.menu.client_id,
      menuID: this.menu.id
    }
    this.subMenuDetails();


  }

  subMenuDetails() {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();
    this.menuService.getSubMenu(this.getMenuDetail).then((val) => {
      console.log(val)
      this.subMenuResult = val;
      this.menuNotEmpty = this.subMenuResult.subMenuSet;
      if (this.menuNotEmpty) {
        this.subMenuItems = this.subMenuResult.result;
      }
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    });
  }

  itemDetails(item: any) {
    const itemData = {
      has_options: item.has_options,
      id: item.id,
      price: item.price,
      product_description: item.product_description,
      product_image: item.product_image,
      product_name: item.product_name,
      client_id: this.menu.client_id,
      client_menu_id: this.menu.id
    };
    let profileModal = this.modalCtrl.create('ItemDetailPage', { itemData: itemData });
    profileModal.present();
  }
}
