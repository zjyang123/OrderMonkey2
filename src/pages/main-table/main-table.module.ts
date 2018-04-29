import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MainTablePage } from './main-table';

@NgModule({
  declarations: [
    MainTablePage,
  ],
  imports: [
    IonicPageModule.forChild(MainTablePage),
    TranslateModule.forChild()
  ],
})
export class MainTablePageModule {}
