import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuListMasterPage } from './menu-list-master';

@NgModule({
  declarations: [
    MenuListMasterPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuListMasterPage),
  ],
})
export class MenuListMasterPageModule {}
