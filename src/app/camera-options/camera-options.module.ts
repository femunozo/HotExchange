import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CameraOptionsPageRoutingModule } from './camera-options-routing.module';
import { CameraOptionsPage } from './camera-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraOptionsPageRoutingModule
  ],
  declarations: [CameraOptionsPage]
})
export class CameraOptionsPageModule {}
