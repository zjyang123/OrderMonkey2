import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TableDetailPage } from './table-detail';

@NgModule({
  declarations: [
    TableDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TableDetailPage),
  ],
})
export class TableDetailPageModule {}
