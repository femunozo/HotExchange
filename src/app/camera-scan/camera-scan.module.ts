import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraScanPageRoutingModule } from './camera-scan-routing.module';

import { CameraScanPage } from './camera-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraScanPageRoutingModule
  ],
  declarations: [CameraScanPage]
})
export class CameraScanPageModule {}
