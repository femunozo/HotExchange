import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraResultPageRoutingModule } from './camera-result-routing.module';

import { CameraResultPage } from './camera-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraResultPageRoutingModule
  ],
  declarations: [CameraResultPage]
})
export class CameraResultPageModule {}
