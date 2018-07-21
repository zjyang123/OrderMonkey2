import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, MenuController, NavController, Events } from 'ionic-angular';

import { Tab1Root, Tab2Root, Tab3Root } from '../pages';
import { SuperTabsController } from 'ionic2-super-tabs';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;

  tab1Title = " ";
  tab2Title = " ";
  tab3Title = " ";

  itemCartNumber = 0;

  constructor(
    public navCtrl: NavController, 
    public translateService: TranslateService, 
    public menuCtrl: MenuController, 
    public events: Events,
    public superTabsCtrl: SuperTabsController
  ) {
    translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE']).subscribe(values => {
      this.tab1Title = values['TAB1_TITLE'];
      this.tab2Title = values['TAB2_TITLE'];
      this.tab3Title = values['TAB3_TITLE'];

      events.subscribe('cartItem:added', (addCartItem) => {
        this.itemCartNumber++;
        console.log(addCartItem)
      });

      this.menuCtrl.enable(true, 'welcomeMenu'); // Enables WelcomePage dedicated menu
    });
  }
}
