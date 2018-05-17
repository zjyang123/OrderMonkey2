import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { MenuControllerService } from '../../app/service/menu-controller.service';
import { Storage } from '@ionic/storage';
import { NotificationBarService } from '../../app/service/notificationbar.service';

/**
 * Generated class for the MainTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-table',
  templateUrl: 'main-table.html',
})
export class MainTablePage {
  public tableInfo;
  public tableInfoDetail;
  public menuIsSet = true;
  public notificationBar: NotificationBarService;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private menuService: MenuControllerService,
    private storage: Storage
  ) {
    
  }

  ionViewWillEnter() {
    this.tableInit();
  }

  tableDetails(menu: any) {
      this.navCtrl.push('TableDetailPage', {
        menu: menu
      });
  }

  tableInit() {
    this.storage.get('table_data').then((val) => {
      this.menuService.getMenuCatagory(val).then((result) => {
        this.tableInfo = result;
        this.menuIsSet = this.tableInfo.clientMenuSet;
        if (this.tableInfo.clientMenuSet) {
          this.tableInfoDetail = this.tableInfo.result;

        } else {
          console.log('empty')
        }

      }, (err) => {

      });
    });
  }
}
