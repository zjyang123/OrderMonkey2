import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { MenuControllerService } from '../../app/service/menu-controller.service';
import { NotificationBarService } from '../../app/service/notificationbar.service';
/**
 * Generated class for the TableDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-table-detail',
  templateUrl: 'table-detail.html',
})
export class TableDetailPage {
  public menu;
  public subMenuResult;
  public menuNotEmpty = true;
  public subMenuItems;
  public getMenuDetail = {
    menuID: '',
    clientID: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public menuService: MenuControllerService, // This is for food menu controller service
    public loadingCtrl: LoadingController,
    public notificationBar: NotificationBarService
    
  ) {
    this.menu = navParams.get('menu');
    this.getMenuDetail.clientID = this.menu.client_id;
    this.getMenuDetail.menuID = this.menu.id;
    this.subMenuDetails();
  }

  subMenuDetails() {
    let loading = this.loadingCtrl.create({
      content: ''
    });
    loading.present();
    this.menuService.getSubMenu(this.getMenuDetail).then((val) => {
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

  itemDetails(item:any) {
    if (item.has_options == 1) {
      const message = 'Item added to your cart!';
      this.notificationBar.notificationbarTask(message, 3000, 'bottom');
    } else {
      let profileModal = this.modalCtrl.create('ItemDetailPage', {item: item});
      profileModal.present();
    }
  }

  pressItemDetails(item:any) {
    let profileModal = this.modalCtrl.create('ItemDetailPage', {item: item});
    profileModal.present();
  }
}
